import { DataTypes } from 'sequelize';
import { sequelize } from '../database/config';
import { rolDetailsModel } from './rolDetails.model';

export const permissionsModel = sequelize.define('permissions', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

permissionsModel.hasMany(rolDetailsModel, {
	foreignKey: 'permissionId',
	sourceKey: 'id',
});

rolDetailsModel.belongsTo(permissionsModel, {
	foreignKey: 'permissionId',
	targetKey: 'id',
});
