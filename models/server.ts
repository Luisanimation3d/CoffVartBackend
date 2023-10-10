import express from "express";

export class Server{
    public app: express.Application;
    public port: number = 3000;

    constructor(){
        this.app = express();
        this.port = 3000;

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*'); // Cambia '*' por el dominio permitido si es necesario
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
        this.app.get("/", (req, res) => {
            res.send("¡Love u!");
        });
    }

    listen() {
		this.app.listen(this.port, () => {
			console.log('Servidor corriendo en puerto', this.port);
		});
	}
}