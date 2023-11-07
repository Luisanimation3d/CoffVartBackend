import { DataTypes } from 'sequelize';
import { sequelize } from '../database/config';
import { roleDetailsModel } from './roleDetails.model';
import { userModel } from './users.model';

/* The code `export const rolesModel = sequelize.define('roles', {...});` is defining a Sequelize model
for the "roles" table in the database. */
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

/* The code `rolesModel.hasMany(roleDetailsModel, { foreignKey: 'rolId', sourceKey: 'id' });` is
establishing a one-to-many relationship between the `rolesModel` and `roleDetailsModel` models in
Sequelize. */
rolesModel.hasMany(roleDetailsModel, {
	foreignKey: 'rolId',
	sourceKey: 'id',
});

/* The code `roleDetailsModel.belongsTo(rolesModel, { foreignKey: 'rolId', targetKey: 'id' });` is
establishing a one-to-one relationship between the `roleDetailsModel` and `rolesModel` models in
Sequelize. */
roleDetailsModel.belongsTo(rolesModel, {
	foreignKey: 'rolId',
	targetKey: 'id',
});

/* The code `rolesModel.hasOne(userModel, { foreignKey: 'roleId', sourceKey: 'id' });` is establishing
a one-to-one relationship between the `rolesModel` and `userModel` models in Sequelize. */
rolesModel.hasOne(userModel, {
	foreignKey: 'roleId',
	sourceKey: 'id',
});

/* The code `userModel.belongsTo(rolesModel, { foreignKey: 'roleId', targetKey: 'id' });` is
establishing a one-to-one relationship between the `userModel` and `rolesModel` models in Sequelize. */
userModel.belongsTo(rolesModel, {
	foreignKey: 'roleId',
	targetKey: 'id',
});
