import {Response, Request} from "express";
import { companyModel } from "../models/companys.model";

export const getCompanys = async (req: Request, res: Response)=> {
    const companys = await companyModel.findAll();
    res.status(200).json({companys});
}

export const postCompanys =async(req:Request, res:Response)=> {
    const {name, address} = req.body;
    const newCompany = await companyModel.create({name,address});
    res.status(200).json({newCompany});
}

export const putCompanys = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, address } = req.body;
    const companys = await companyModel.findByPk(id);
    if (!companys) {
        return res.status(404).json({ msg: 'Company not found' });
    }
    await companys.update({ name, address });
    res.status(200).json({ companys });
}

export const deleteCompanys= async (req: Request, res: Response) => {
    const { id } = req.params;
    const companys = await companyModel.findByPk(id);
    if (!companys) {
        return res.status(404).json({ msg: 'Company not found' });
    }
    await companys.destroy();
    res.status(200).json({ companys });
}