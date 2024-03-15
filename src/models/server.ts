import express from 'express';
import { sequelize } from '../database/config';
import { routes } from '../routes/test';
import permissionRoutes from '../routes/permissions.routes';
import coustomersRoutes from '../routes/coustomers.routes';
import suppliesRoutes from '../routes/supplies.routes';
import productsRoutes from '../routes/products.routes';
import rolesRouter from '../routes/roles.routes';
import salesRouter from '../routes/sales.routes';
import ordersRouter from '../routes/orders.routes';
import productionOrdersRouter from '../routes/productionOrders.routes';
import productionRequestsRouter from '../routes/productionRequests.routes';
import processesRouter from '../routes/processes.routes';
import companysRouter from '../routes/companys.routes';
import suppliersRouter from '../routes/suppliers.routes';
import userRouter from '../routes/users.routes';
import loginRouter from '../routes/login.routes';
import shopRouter from '../routes/shops.routes';
import recoveryPasswordRoter from '../routes/recoveryPassword.routes';
import detailsRouter from '../routes/details.routes'
import suppliesActiveRouter from '../routes/suppliesActive.route';
import coustomersActive from '../routes/coustomersActive.routes';

export class Server {
	public app: express.Application;
	public port: number = parseInt(process.env.PORT || '') || 3000;
	public testPath: string;
	public permissionPath: string;
	public suppliesPath: string;
	public productsPath: string;
	public coustomersPath: string;
	public rolesPath: string;
	public salesPath: string;
	public ordersPath: string;
	public productionOrdersPath: string;
	public productionRequestsPath: string;
	public processesPath: string;
	public companysPath: string;
	public suppliersPath: string;
	public userPath: string;
    public loginPath: string;
	public shopPath: string;
	public recoveryPasswordPath: string;
	public detailsPath: string;
	public suppliesActivePath: string;
	public coustomersActivePath: string;
	private apikey: string = '8b9c63adc6a049c291fb09ad35c3f14b';

	constructor() {
		this.app = express();
		this.middlewares();
		this.port = parseInt(process.env.PORT || '') || 3000;
		this.testPath = '/test';
		this.permissionPath = '/api/permissions';
		this.suppliesPath = '/api/supplies';
		this.productsPath = '/api/products';
		this.coustomersPath = '/api/coustumers';
		this.rolesPath = '/api/roles';
		this.salesPath = '/api/sales';
		this.ordersPath = '/api/orders';
		this.productionOrdersPath = '/api/productionOrders';
		this.productionRequestsPath = '/api/productionRequests';
		this.processesPath = '/api/processes'
		this.companysPath = '/api/companys';
		this.suppliersPath = '/api/suppliers';
		this.userPath = '/api/users';
		this.loginPath = '/api/login';
		this.shopPath = '/api/shops';
		this.recoveryPasswordPath = '/api/auth/';
		this.detailsPath= '/api/details';
		this.suppliesActivePath = '/api/suppliesActive';
		this.coustomersActivePath= '/api/coustumersActive';
		this.routes();
		this.dbConnection();
	}

	middlewares() {
		this.app.use((req, res, next) => {
			const apiKeyQuery = req.query['apikey'];
			if (!apiKeyQuery || apiKeyQuery !== this.apikey) {
				res.status(401).json({ error: 'Unauthorized' });
				return;
			}
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
			res.setHeader(
				'Access-Control-Allow-Headers',
				'Content-Type, Authorization'
			);
			return next();
		});
		this.app.use(express.json());
	}

	routes() {
		this.app.use(this.testPath, routes);
		this.app.use(this.permissionPath, permissionRoutes);
		this.app.use(this.suppliesPath, suppliesRoutes);
		this.app.use(this.productsPath, productsRoutes);
		this.app.use(this.coustomersPath, coustomersRoutes);
		this.app.use(this.rolesPath, rolesRouter);
		this.app.use(this.salesPath, salesRouter);
		this.app.use(this.ordersPath, ordersRouter);
		this.app.use(this.productionOrdersPath, productionOrdersRouter);
		this.app.use(this.productionRequestsPath, productionRequestsRouter);
		this.app.use(this.processesPath, processesRouter);
		this.app.use(this.companysPath, companysRouter);
		this.app.use(this.suppliersPath, suppliersRouter);
		this.app.use(this.userPath, userRouter);
        this.app.use(this.loginPath, loginRouter);
		this.app.use(this.shopPath, shopRouter);
		this.app.use(this.recoveryPasswordPath, recoveryPasswordRoter);
		this.app.use(this.detailsPath,detailsRouter)
		this.app.use(this.suppliesActivePath, suppliesActiveRouter);
		this.app.use(this.coustomersActivePath, coustomersActive);
	}

	async dbConnection() {
		try {
			await sequelize.sync({ force: false });
			console.log('db connection success');
		} catch (err) {
			console.log('db connection error: ' + err);
		}
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log('Servidor corriendo en puerto', this.port);
		});
	}
}
 