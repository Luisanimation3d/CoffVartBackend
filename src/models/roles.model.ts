import { DataTypes } from 'sequelize';
import { sequelize } from '../database/config';
import { roleDetailsModel } from './roleDetails.model';
import { userModel } from './users.model';

export const rolesModel = sequelize.define('roles', {
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

rolesModel.hasMany(roleDetailsModel, {
	foreignKey: 'rolId',
	sourceKey: 'id',
});

roleDetailsModel.belongsTo(rolesModel, {
	foreignKey: 'rolId',
	targetKey: 'id',
});

rolesModel.hasOne(userModel, {
	foreignKey: 'rolId',
	sourceKey: 'id',
});

userModel.belongsTo(rolesModel, {
	foreignKey: 'rolId',
	targetKey: 'id',
});