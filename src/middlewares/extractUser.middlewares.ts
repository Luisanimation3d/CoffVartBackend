import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { tokenModel } from '../models/token.model';
import { JwtPayloadWithTokenData } from 'token';

interface ExtendRequest extends Request {
    user?: JwtPayloadWithTokenData 
}

export const extractUserMiddlewares = async (req: ExtendRequest, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization?.split(' ')[1];
        const tokenDB = await tokenModel.findOne({ where: { token } });
        if (!tokenDB) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        if (!token) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const decodedToken: JwtPayloadWithTokenData = jwt.verify(token, process.env.SECRET_KEY || "Klingon");
        if(!decodedToken.user.id){
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
    
        if (decodedToken.user.exp < Math.floor(Date.now() / 1000)) {
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