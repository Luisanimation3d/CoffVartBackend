import { DataTypes } from 'sequelize';
import { sequelize } from '../database/config';
import { roleDetailsModel } from './roleDetails.model';

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

permissionsModel.hasMany(roleDetailsModel, {
	foreignKey: 'permissionId',
	sourceKey: 'id',
});

roleDetailsModel.belongsTo(permissionsModel, {
	foreignKey: 'permissionId',
	targetKey: 'id',
});
