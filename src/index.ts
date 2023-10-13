import { Server } from "./models/server";

require('dotenv-ts').config();

const server = new Server();

server.listen();