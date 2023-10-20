import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../database/config";
import { permissionsModel } from "./permissions.model";
import { rolsModel } from "./rols.model";

export const rolDetailsModel = sequelize.define('rol_details', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    rolId: {
        type: DataTypes.INTEGER(),
        references: {
            model: rolsModel,
            key: 'id'
        }
    },
    permissionId: {
        type: DataTypes.INTEGER(),
        references: {
            model: permissionsModel,
            key: 'id'
        }
    }
})

rolsModel.belongsToMany(permissionsModel, { through: rolDetailsModel });
permissionsModel.belongsToMany(rolsModel, { through: rolDetailsModel });