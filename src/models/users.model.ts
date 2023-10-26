import { DataTypes } from 'sequelize';
import { sequelize } from '../database/config';
import { UserModelType } from 'user';

export const userModel = sequelize.define<UserModelType>(
	'users',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		lastname: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		state: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(128),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);
