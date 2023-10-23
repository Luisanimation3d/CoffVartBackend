import {DataTypes } from 'sequelize'
import { sequelize } from '../database/config'
import { salesdetailsModel } from './salesdetails.model';

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
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate:{
            isEmail:{
              msg: 'El correo debe ser valido'
            },
        },
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

coustumersModel.hasMany(salesdetailsModel, {
    foreignKey: 'customerId', 
    sourceKey: 'id'
  });

salesdetailsModel.belongsTo(coustumersModel, {
    foreignKey: 'customerId',
    targetKey: 'id'
  });
  