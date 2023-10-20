import {DataTypes } from 'sequelize'
import { sequelize } from '../database/config'

export const coustumersModel = sequelize.define('coustumers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    email: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(50),
        allowNull: false
    }, 
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{   
    timestamps: true
})