import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";
import { rolsModel } from "./rols.model";

export const userModel = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },
    lastname: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: true
})

userModel.belongsTo(rolsModel, { foreignKey: 'rol_id', targetKey: 'id' });