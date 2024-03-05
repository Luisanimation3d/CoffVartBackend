import {rolesModel} from "../models/roles.model";
import {roles} from "../utils/roles";
import {roleDetailsModel} from "../models/roleDetails.model";

export async function rolesSeeder() {
    try {
        roles.forEach((element) => {

            async function createRole() {
                const newRole = await rolesModel.create({
                    name: element.name,
                    description: element.description
                })
                const permissionsInstance = element.permissions.map((permission) => ({
                    rolId: newRole.getDataValue('id'),
                    permissionId: permission
                }));

                console.log(permissionsInstance[0], 'permissionsInstance');

                await roleDetailsModel.bulkCreate(permissionsInstance);
            }

            createRole();

        });
        return true;
    } catch (e) {
        console.log(e);
        return false
    }
}