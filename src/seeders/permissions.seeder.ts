import { permissionsModel } from '../models/permissions.model';
import { permissions } from '../utils/permissions';

export function permissionSeeder () {
    try {
        permissions.forEach((element) => {
            permissionsModel.create({
                name: element.name,
                description: element.description
            })
        });
        return true;
    }catch (e) {
        console.log(e);
        return false
    } 
}