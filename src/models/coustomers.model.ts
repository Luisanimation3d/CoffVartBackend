import { DataTypes } from 'sequelize'
import { sequelize } from '../database/config'
import { salesModel } from './sales.model';
import { salesdetailsModel } from './salesdetails.model';
import { ordersderailsModel } from './ordersderails.model';
import { ordersModel } from './orders.model';

export const coustumersModel = sequelize.define('coustumers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    documentType: {
        type: DataTypes.STRING(2),
        allowNull: false,
        validate: {
            isIn: [['CC', 'TI']]
        }
    },
    document: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNotTooLong(value: number) {
                if (value.toString().length > 10) {
                    throw new Error('Document number must have no more than 10 digits');
                }
            }
        }
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            isNumeric: true
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

    coustumersModel.hasMany(salesModel, {
        foreignKey: 'customerId',
        sourceKey: 'id'
    });
    
    salesModel.belongsTo(coustumersModel, {
        foreignKey: 'customerId',
        targetKey: 'id'
    });
    coustumersModel.hasMany(salesdetailsModel, {
        foreignKey: 'customerId',
        sourceKey: 'id'
    });
    
    salesdetailsModel.belongsTo(coustumersModel, {
        foreignKey: 'customerId',
        targetKey: 'id'
    });
    coustumersModel.hasMany(ordersderailsModel, {
        foreignKey: 'customerId',   
        sourceKey: 'id'
        });
    ordersderailsModel.belongsTo(coustumersModel, {
        foreignKey: 'customerId',
        targetKey: 'id'
        });

    coustumersModel.hasMany(ordersModel, {
        foreignKey: 'customerId',
        sourceKey: 'id'
    });

    ordersModel.belongsTo(coustumersModel, {
        foreignKey: 'customerId',
        targetKey: 'id'
    });

