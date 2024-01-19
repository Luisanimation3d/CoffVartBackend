import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
	'postgres://coffvart_p698_user:y8fOwolX3XYJCDDgdoo1Vzg5Ui5LxhjA@dpg-cmkpkj6n7f5s73bajct0-a.oregon-postgres.render.com/coffvart_p698',
	{
		dialect: 'postgres',
		protocol: 'postgres',
		dialectOptions: {
			ssl: {
				require: 'true',
			},
		}
	}
);

