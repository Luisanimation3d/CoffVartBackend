import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/users.model';
import { UserModelType } from 'user';
import { tokenModel } from '../models/token.model';

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