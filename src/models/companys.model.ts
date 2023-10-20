import {DataTypes} from "sequelize";
import {sequelize} from "../database/config";

export const companyModel = sequelize.define('companys',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    State: {
        type: DataTypes.BOOLEAN,
    }
},{
    timestamps: true
})