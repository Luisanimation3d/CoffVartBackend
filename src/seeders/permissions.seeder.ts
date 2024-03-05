import { permissionsModel } from '../models/permissions.model';
import { permissions } from '../utiles/permissions';

async function permissionSeeder () {
    try {
        permissions.forEach(async (element) => {
            await permissionsModel.create({
                name: element.name,
                description: element.description
            })
        });
    }catch (e) {
        console.log(e);
    } 
}

permissionSeeder()