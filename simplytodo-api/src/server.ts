import Main from "./classes/Main.class";
import express, { Express } from "express";
import config from "../config/defaults";

let router: Express = express();
const port: number = config.port;

const main: Main = new Main(router, port);
main.startServer();
