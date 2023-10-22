import { DataTypes } from 'sequelize';
import { sequelize } from '../database/config';
import { rolDetailsModel } from './rolDetails.model';

export const rolsModel = sequelize.define('rols', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING(128),
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING(128),
		allowNull: false,
	},
	state: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
	},
});

rolsModel.hasMany(rolDetailsModel, {
	foreignKey: 'rolId',
	sourceKey: 'id',
});

rolDetailsModel.belongsTo(rolsModel, {
	foreignKey: 'rolId',
	targetKey: 'id',
});
