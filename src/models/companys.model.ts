import {DataTypes} from "sequelize";
import {sequelize} from "../database/config";
/* The code is defining a Sequelize model for a table called "companys" in a database. */

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
    nit: {
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
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    timestamps: true
})