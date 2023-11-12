import {DataTypes} from "sequelize";
import {sequelize} from "../database/config";

export const productionRequestModel = sequelize.define('productionRequests',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    requestNumber: {
        type: DataTypes.INTEGER,
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
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    timestamps: true
})

