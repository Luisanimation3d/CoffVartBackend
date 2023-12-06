import {DataTypes} from "sequelize";
import {sequelize} from "../database/config";
import { productionOrdersDetailsModel } from "./productionOrdersDetails.model";

export const processesModel = sequelize.define('process',{
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
processesModel.hasMany(productionOrdersDetailsModel, {
    foreignKey: 'processId',
    sourceKey: 'id'
    });

productionOrdersDetailsModel.belongsTo(processesModel, {
    foreignKey: 'processId',
    targetKey: 'id'
    });
