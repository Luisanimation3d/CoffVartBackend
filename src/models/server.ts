import express from "express";
import { sequelize } from "../database/config";
import { routes } from "../routes/test";
import permissionRoutes from "../routes/permissions.routes";
import coustomersRoutes from "../routes/coustomers.routes";
import companyRoutes from "../routes/companys.routes";
import supplierRoutes from "../routes/suppliers.routes";
import productionOrderRoutes from "../routes/productionOrders.routes";
import productRoutes from "../routes/products.routes";
import supplieRoutes from "../routes/supplies.routes";
import shopRoutes from "../routes/shops.routes";

export class Server {
    public app: express.Application;
    public port: number = parseInt(process.env.PORT || '') || 3000;
    public testPath: string;
    public permissionPath: string;
    public companyPath:string;
    public supplierPath:string;
    public productionOrderPath:string;
    public productPath:string;
    public suppliePath:string;
    public shopPath:string;
    public coustomersPath: string;
    private apikey: string = '8b9c63adc6a049c291fb09ad35c3f14b';
    

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT || '') || 3000;
        this.testPath = '/test';
        this.permissionPath = '/api/permissions';
        this.coustomersPath= '/api/coustumers';
        this.companyPath='/api/companys';
        this.supplierPath='/api/suppliers';
        this.productionOrderPath='/api/productionOrders';
        this.productPath='/api/products';
        this.suppliePath='/api/supplies';
        this.shopPath='/api/shops';
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
        this.app.use(this.coustomersPath, coustomersRoutes);
        this.app.use(this.companyPath,companyRoutes);
        this.app.use(this.supplierPath,supplierRoutes);
        this.app.use(this.productionOrderPath,productionOrderRoutes);
        this.app.use(this.productPath,productRoutes);
        this.app.use(this.suppliePath,supplieRoutes);
        this.app.use(this.shopPath,shopRoutes);
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