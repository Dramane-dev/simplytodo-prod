import { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import compression from "compression";
import { connectionToDatabase } from "../../db/connection.db";
import { authRoutes } from "../routes/auth/auth.route";
import { projectRoutes } from "../routes/project/project.route";
import cors, { CorsOptions } from "cors";
import { taskRoute } from "../routes/task/task.route";
import { healthcheckRoutes } from "../routes/healthcheck/healthcheck";
export default class Main {
    constructor(private _router: Express, private _port: number) {}

    initialization(): void {
        const corsOptions: CorsOptions = {
            origin: "http://localhost",
            credentials: true
        };

        this._router.use(bodyParser.urlencoded({ extended: false }));
        this._router.use(bodyParser.json());
        this._router.use(compression());
        this._router.use(cors(corsOptions));
        this._router.use((req: Request, res: Response, next: NextFunction) => {
            res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
            next();
        });
        this._router.use("/simplytodo/api", healthcheckRoutes);
        this._router.use("/simplytodo/api", authRoutes);
        this._router.use("/simplytodo/api", projectRoutes);
        this._router.use("/simplytodo/api", taskRoute);
        // this._router.use("/", healthcheckRoutes);
        // this._router.use("/", authRoutes);
        // this._router.use("/", projectRoutes);
        // this._router.use("/", taskRoute);
    }

    startServer(): void {
        this.initialization();
        this._router.listen(this._port, async () => {
            console.log(`Server running on port ${this._port} ✅`);
        });
        connectionToDatabase();
    }
}
