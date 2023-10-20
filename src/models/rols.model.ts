import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";
import { permissionsModel } from "./permissions.model";

export const rolsModel = sequelize.define('rols', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

rolsModel.hasMany(permissionsModel, { foreignKey: 'rol_id', sourceKey: 'id' });
permissionsModel.belongsTo(rolsModel, { foreignKey: 'rol_id', targetKey: 'id' });