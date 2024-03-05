import { DataTypes } from 'sequelize';
import { sequelize } from '../database/config';
import { suppliesModel } from './supplies.model';
import { shopModel } from './shops.model';
import { shopdetailsModel } from './shopdetails.model';


export const supplierModel = sequelize.define(
	'suppliers',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		nit:{
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		coffeType: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		quality: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		state: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		timestamps: true,
	}
);

supplierModel.hasMany(suppliesModel, {
	foreignKey: 'supplierId',
	sourceKey: 'id',
});
suppliesModel.belongsTo(supplierModel, {
	foreignKey: 'supplierId',
	targetKey: 'id',
});
supplierModel.hasMany(shopdetailsModel, {
	foreignKey: 'supplierId',
	sourceKey: 'id'
});
shopdetailsModel.belongsTo(supplierModel, {
	foreignKey: 'supplierId',
	targetKey: 'id'
	});

supplierModel.hasMany(shopModel, {
	foreignKey: 'supplierId',
	sourceKey: 'id'
});

shopModel.belongsTo(supplierModel, {
	foreignKey: 'supplierId',
	targetKey: 'id'
});

