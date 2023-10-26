import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/users.model';
import { UserModelType } from 'user';

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

    // Generate JWT
    const token = jwt.sign({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.roleId
        }
    }, process.env.SECRET_KEY || "Klingon", { expiresIn: '1h' });

    res.status(200).json({ token });

}