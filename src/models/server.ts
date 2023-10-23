import express from "express";
import { sequelize } from "../database/config";
import { routes } from "../routes/test";
import permissionRoutes from "../routes/permissions.routes";
import coustomersRoutes from "../routes/coustomers.routes";
import suppliesRoutes from "../routes/supplies.routes";
import productsRoutes from "../routes/products.routes";
import rolesRouter from "../routes/roles.routes";
import salesRouter from "../routes/sales.routes";

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
    private apikey: string = '8b9c63adc6a049c291fb09ad35c3f14b';
    

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT || '') || 3000;

        this.testPath = '/test';
        this.permissionPath = '/api/permissions';
        this.suppliesPath = '/api/supplies';
        this.productsPath = '/api/products';
        this.coustomersPath= '/api/coustumers';
        this.rolesPath = '/api/roles';
        this.salesPath = '/api/sales';
        this.middlewares();
        this.routes();
        this.dbConnection();

    }

    middlewares() {
        console.log()
        this.app.use((req, res, next) => {
            const apiKeyHeader = req.headers["authorization"];
            const apiKeyQuery = req.query['apikey'];
            if (!apiKeyQuery || apiKeyQuery !== this.apikey) {
                res.status(401).json({ error: 'Unauthorized' })
                return
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