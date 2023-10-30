import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/users.model';
import { UserModelType } from 'user';
import { tokenModel } from '../models/token.model';

/**
 * The loginController function handles user login by checking the email and password, generating a JWT
 * token, and returning it in the response.
 * @param {Request} req - The `req` parameter is the request object that contains information about the
 * incoming HTTP request, such as the request headers, request body, and request parameters.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It is an instance of the `Response` class from the Express framework.
 * @returns a JSON response with a token if the login is successful. If the login is not successful, it
 * returns a JSON response with an error message.
 */
export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user: UserModelType | null = await userModel.findOne({ where: { email } })

    if (!user) {
        return res.status(400).json({ msg: 'Email or password are incorrect 1' });
    }
    if (!user.state) {
        return res.status(400).json({ msg: 'Email or password are incorrect 2' });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ msg: 'Email or password are incorrect 3' });
    }

    const token = jwt.sign({    
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.roleId,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 60 * 60
        }
    }, process.env.SECRET_KEY || "Klingon", { expiresIn: '1h' });

    await tokenModel.create({ token });

    res.status(200).json({ token });

}

/**
 * The `logoutController` function is an asynchronous function that handles the logout functionality by
 * destroying the token associated with the user and clearing the authorization header.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} res - The `res` parameter is the response object that is used to send a response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending data back to the client.
 * @returns a JSON response with a status code of 200 and a message of 'Logout' if the logout process
 * is successful. If there is an error, it will return a JSON response with a status code of 500 and an
 * error message of 'Internal server error'.
 */
export const logoutController = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization?.split(' ')[1];
        await tokenModel.destroy({ where: { token } });
        if(token){
            req.headers.authorization = '';
        }
        res.status(200).json({ msg: 'Logout' });
    }catch(err){
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
}