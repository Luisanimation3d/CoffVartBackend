import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { userModel } from '../models/users.model';
import { UserModelType } from 'user';

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await userModel.findAll();
		res.status(200).json({ users });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error });
	}
};

export const getUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user: UserModelType | null = await userModel.findByPk(id);
		if (!user) {
			return res.status(404).json({ msg: 'User not found' });
		}
		res.status(200).json({ user });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error });
	}
};

export const postUser = async (req: Request, res: Response) => {
    const { name, lastname, address, phone, email, password, roleId } = req.body;
	try {
        const passwordHash = bcrypt.hashSync(password, 10);
		const newUser = await userModel.create({ name, lastname, address, phone, email, password: passwordHash, roleId });
		res.status(200).json({ newUser });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error });
	}
};

export const putUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, lastname, address, phone, email, password, roleId } = req.body;
    try {
        const user: UserModelType | null = await userModel.findByPk(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        await user.update({ name, lastname, address, phone, email, password, roleId });
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user: UserModelType | null = await userModel.findByPk(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        await user.update({ state: !user.state });
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
}
