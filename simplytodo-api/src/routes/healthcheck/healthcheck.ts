import express, { Router } from "express";
import { healthcheckController } from "../../controllers/healthcheck/healthcheckController";

const healthcheckRoutes: Router = express.Router();
healthcheckRoutes.get("/healthcheck", healthcheckController);

export { healthcheckRoutes };