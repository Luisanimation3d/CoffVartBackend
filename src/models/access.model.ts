import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";
import { userModel } from "./users.model";

export const accessModel = sequelize.define('access', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

accessModel.belongsTo(userModel, { foreignKey: 'user_id', targetKey: 'id' });