import {DataTypes} from "sequelize";
import {sequelize} from "../database/config";
import { suppliesModel } from "./supplies.model";
import { companyModel } from "./companys.model";
import { processesModel } from "./processes.model";

export const productionRequestModel = sequelize.define('productionRequests',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    requestNumber: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    dateOfDispatch: {
        type: DataTypes.DATE,
        allowNull: false
    },
    quantity: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    },
    reasonCancellation: {
        type: DataTypes.STRING(500),
        allowNull:true
    },
    observations: {
        type: DataTypes.STRING(500),
        allowNull:true
    },
},{
    timestamps: true
})
suppliesModel.hasOne(productionRequestModel,{
    foreignKey: 'supplieId',
    sourceKey: 'id',
});

productionRequestModel.belongsTo(suppliesModel,{
    foreignKey: 'supplieId',
    targetKey: 'id',
});
companyModel.hasOne(productionRequestModel,{
    foreignKey: 'companyId',
    sourceKey: 'id',
});

productionRequestModel.belongsTo(companyModel,{
    foreignKey: 'companyId',
    targetKey: 'id',
});
processesModel.hasOne(productionRequestModel,{
    foreignKey: 'processId',
    sourceKey: 'id',
});

productionRequestModel.belongsTo(processesModel,{
    foreignKey: 'processId',
    targetKey: 'id',
});


