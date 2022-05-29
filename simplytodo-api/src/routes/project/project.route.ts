import express, { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken";
import { createProjectController } from "../../controllers/project/createProjectController";
import { deleteProjectController } from "../../controllers/project/deleteProjectController";
import { getAllProjectsController } from "../../controllers/project/getAllProjectsController";
import { getProjectByIdController } from "../../controllers/project/getProjectByIdController";
import { updateProjectController } from "../../controllers/project/updateProjectController";

const projectRoutes: Router = express.Router();
projectRoutes.get("/api/projects/:id", [verifyToken], getAllProjectsController);
projectRoutes.get("/api/project/:id", [verifyToken], getProjectByIdController);
projectRoutes.post("/api/project/:id", [verifyToken], createProjectController);
projectRoutes.put("/api/project/:projectId", [verifyToken], updateProjectController);
projectRoutes.delete("/api/project/:id", [verifyToken], deleteProjectController);

export { projectRoutes };
