import { Request, Response, NextFunction } from 'express';
import { roleDetailsModel } from '../models/roleDetails.model';
import { permissionsModel } from '../models/permissions.model';
import { rolesModel } from '../models/roles.model';
import { userModel } from '../models/users.model';
import { JwtPayloadWithTokenData } from 'token';

interface ExtendRequest extends Request {
    user?: JwtPayloadWithTokenData
}

export const GetUsersMiddleware = async (req: ExtendRequest, res: Response, next: NextFunction) => {

    const userId = req.user.id;

    const user = await userModel.findOne({
        where: { id: userId }, include: [
            {
                model: rolesModel,
                include: [
                    {
                        model: roleDetailsModel,
                        include: [{
                            model: permissionsModel,
                            attributes: ['name']
                        }]
                    }
                ]
            }
        ]
    });

    if (!(user.roleId.rol_details.include(permissionsModel, { where: { name: 'Get Users' } }))) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    next();

}

export const PostUsersMiddleware = async (req: ExtendRequest, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const user = await userModel.findOne({
        where: { id: userId }, include: [
            {
                model: rolesModel,
                include: [
                    {
                        model: roleDetailsModel,
                        include: [{
                            model: permissionsModel,
                            attributes: ['name']
                        }]
                    }
                ]
            }
        ]
    });

    if (!(user.roleId.rol_details.include(permissionsModel, { where: { name: 'Post Users' } }))) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    next();
}