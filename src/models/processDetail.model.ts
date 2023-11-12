import {DataTypes} from "sequelize";
import {sequelize} from "../database/config";


export const processDetailModel = sequelize.define('processDetail',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    },
},{
    timestamps: true
})

