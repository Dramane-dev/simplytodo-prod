import { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import compression from "compression";
import { connectionToDatabase } from "../../db/connection.db";
import { authRoutes } from "../routes/auth/auth.route";
import { projectRoutes } from "../routes/project/project.route";
import cors from "cors";
import { taskRoute } from "../routes/task/task.route";
import { healthcheckRoutes } from "../routes/healthcheck/healthcheck";
export default class Main {
    constructor(private _router: Express, private _port: number) {}

    initialization(): void {
        // this._router.use(bodyParser.urlencoded({ extended: false }));
        this._router.use(bodyParser.json());
        this._router.use(compression());
        this._router.use(cors());
        this._router.use((req: Request, res: Response, next: NextFunction) => {
            res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
            next();
        });

        // To prod
        // this._router.use("/simplytodo/api", healthcheckRoutes);
        // this._router.use("/simplytodo/api", authRoutes);
        // this._router.use("/simplytodo/api", projectRoutes);
        // this._router.use("/simplytodo/api", taskRoute);

        // To local
        this._router.use("/api", healthcheckRoutes);
        this._router.use("/api", authRoutes);
        this._router.use("/api", projectRoutes);
        this._router.use("/api", taskRoute);
    }

    startServer(): void {
        this.initialization();
        this._router.listen(this._port, async () => {
            console.log(`Server running on port ${this._port} ✅`);
        });
        connectionToDatabase();
    }
}
