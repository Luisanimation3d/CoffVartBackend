import {userModel} from "../models/users.model";
import {coustumersModel} from "../models/coustomers.model";
import {users} from "../utils/users";
import bcrypt from 'bcrypt';

export const userSeeder = async () => {
    try {
        users.forEach((element) => {

            const createUser = async () => {
                const newUser = await userModel.create({
                    name: element.name,
                    lastname: element.lastname,
                    state: element.state,
                    phone: element.phone,
                    email: element.email,
                    password: bcrypt.hashSync(element.password, 10),
                    roleId: element.roleId
                });
                await coustumersModel.create({
                    documentType: element.coustumer.documentType,
                    document: element.coustumer.document,
                    userId: newUser.id,
                    phone: element.phone,
                    address: element.coustumer.address,
                    name: `${element.name} ${element.lastname}`
                });
            }
            createUser();

        });
    } catch (error) {
        console.log(error);
    }
}