import express from "express";

import { routes } from "../routes/test";

export class Server{
    public app: express.Application;
    public port: number = parseInt(process.env.PORT || '') || 3000;
    public testPath: string;

    constructor(){
        this.app = express();
        this.port = parseInt(process.env.PORT || '') || 3000;

        this.testPath = '/api/test';

        this.middlewares();
        this.routes();

        }

    middlewares(){
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
			res.setHeader(
				'Access-Control-Allow-Headers',
				'Content-Type, Authorization'
			);
			next();
        });
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.testPath, routes);
    }

    listen() {
		this.app.listen(this.port, () => {
			console.log('Servidor corriendo en puerto', this.port);
		});
	}
}