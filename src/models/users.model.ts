import { DataTypes } from 'sequelize';
import { sequelize } from '../database/config';
import { UserModelType } from 'user';
import { coustumersModel} from "./coustomers.model";

/* The code `export const userModel = sequelize.define<UserModelType>(...)` is defining a Sequelize
model for the "users" table in the database. */
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

userModel.hasOne(coustumersModel, {
	foreignKey: 'userId',
	sourceKey: 'id',
});

coustumersModel.belongsTo(userModel, {
	foreignKey: 'userId',
	targetKey: 'id',
});