import { DataTypes } from 'sequelize';
import { sequelize } from '../database/config';
import { roleDetailsModel } from './roleDetails.model';

/* The code is defining a Sequelize model for a table called "permissions" in a database. */
export const permissionsModel = sequelize.define('permissions', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

/* The code `permissionsModel.hasMany(roleDetailsModel, { foreignKey: 'permissionId', sourceKey: 'id'
});` is establishing a one-to-many relationship between the `permissionsModel` and
`roleDetailsModel` models in Sequelize. */
permissionsModel.hasMany(roleDetailsModel, {
	foreignKey: 'permissionId',
	sourceKey: 'id',
});

/* The code `roleDetailsModel.belongsTo(permissionsModel, { foreignKey: 'permissionId', targetKey: 'id'
});` is establishing a one-to-one relationship between the `roleDetailsModel` and `permissionsModel`
models in Sequelize. */
roleDetailsModel.belongsTo(permissionsModel, {
	foreignKey: 'permissionId',
	targetKey: 'id',
});
