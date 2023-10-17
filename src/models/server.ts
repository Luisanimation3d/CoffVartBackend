import express from "express";
import { sequelize } from "../database/config";
import { routes } from "../routes/test";

export class Server {
    public app: express.Application;
    public port: number = parseInt(process.env.PORT || '') || 3000;
    public testPath: string;
    private apikey: string = '8b9c63adc6a049c291fb09ad35c3f14b';

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT || '') || 3000;

        this.testPath = '/test';

        this.middlewares();
        this.routes();
        this.dbConnection();

    }

    middlewares() {
        console.log()
        this.app.use((req, res, next) => {
            const apiKeyHeader = req.headers["authorization"];
            const apiKeyQuery = req.query['apikey'];
            if(!apiKeyQuery || apiKeyQuery !== this.apikey) {
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
    }

    async dbConnection(){
        try{
            await sequelize.sync({ force: false });
            console.log('db connection success');
        }catch(err){
            console.log('db connection error: ' + err);
        }
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}