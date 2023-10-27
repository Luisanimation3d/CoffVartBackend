import { DataTypes } from 'sequelize';
import { sequelize } from '../database/config';
import { shopdetailsModel } from './shopdetails.model';

export const shopModel = sequelize.define(
	'shop',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		invoice: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		total: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		state: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);

shopModel.hasMany(shopdetailsModel, {
	foreignKey: 'shopId',
	sourceKey: 'id',
});

shopdetailsModel.belongsTo(shopModel, {
	foreignKey: 'shopId',
	targetKey: 'id',
});