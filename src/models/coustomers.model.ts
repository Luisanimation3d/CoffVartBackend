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
        type: DataTypes.INTEGER(),
        allowNull: false

    },
    email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            isEmail: {
                msg: "El correo electrónico debe tener un formato válido"
            },
            customValidator(value: string) {
                if (!value.includes('@') || !value.endsWith('.com')) {
                    throw new Error('El correo electrónico debe contener "@" y terminar con ".com"');
                }
            }
        }
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