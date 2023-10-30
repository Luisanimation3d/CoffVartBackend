import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { tokenModel } from '../models/token.model';
import { JwtPayloadWithTokenData } from 'token';

interface ExtendRequest extends Request {
    user?: JwtPayloadWithTokenData 
}

/**
 * The function extracts user information from a token and sets it in the request object for further
 * processing.
 * @param {ExtendRequest} req - The `req` parameter is an object that represents the HTTP request being
 * made. It contains information such as the request headers, query parameters, request body, and more.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties to manipulate the response, such as setting
 * the status code, sending JSON data, or redirecting the client to another URL.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically called at the end of the
 * current middleware function to indicate that it has completed its processing and the next middleware
 * function should be called.
 * @returns In this code, if any of the conditions for unauthorized access are met, a response with an
 * error message is sent and the function returns. If the token is valid and the user is authorized,
 * the function sets the `req.user` property to the decoded user object and calls the `next()` function
 * to proceed to the next middleware or route handler.
 */
export const extractUserMiddlewares = async (req: ExtendRequest, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const tokenDB = await tokenModel.findOne({ where: { token } });
        if (!tokenDB) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const decodedToken: JwtPayloadWithTokenData = jwt.verify(token, process.env.SECRET_KEY || "Klingon");
        if(!decodedToken.user.id){
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
    
        if (decodedToken.user.exp < Math.floor(Date.now() / 1000) + 60 * 60) {
            res.status(401).json({ error: 'Unauthorized' });
            await tokenModel.destroy({ where: { token } });
            return;
        }
    
        const user = decodedToken.user;
    
        req.user = user;
        next();
    }catch(err){
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
}