import {DataTypes} from "sequelize";
import {sequelize} from "../database/config";

export const processModel = sequelize.define('process',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    timestamps: true
})

