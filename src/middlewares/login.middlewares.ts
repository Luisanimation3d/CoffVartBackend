import { Request, Response, NextFunction } from 'express';

export const loginMiddlewares = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try{
        const emailValidation = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!email || !password) {
            res.status(400).json({ error: 'Username and password are required' });
            return;
        }
        if(emailValidation.test(email) === false){
            res.status(400).json({ error: 'Email is not valid' });
            return;
        }
        next();
    }catch{
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
}