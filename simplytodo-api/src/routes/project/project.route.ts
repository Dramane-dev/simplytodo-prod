import express, { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken";
import { createProjectController } from "../../controllers/project/createProjectController";
import { deleteProjectController } from "../../controllers/project/deleteProjectController";
import { getAllProjectsController } from "../../controllers/project/getAllProjectsController";
import { getProjectByIdController } from "../../controllers/project/getProjectByIdController";
import { updateProjectController } from "../../controllers/project/updateProjectController";

const projectRoutes: Router = express.Router();
projectRoutes.get("/projects/:id", [verifyToken], getAllProjectsController);
projectRoutes.get("/project/:id", [verifyToken], getProjectByIdController);
projectRoutes.post("/project/:id", [verifyToken], createProjectController);
projectRoutes.put("/project/:projectId", [verifyToken], updateProjectController);
projectRoutes.delete("/project/:id", [verifyToken], deleteProjectController);

export { projectRoutes };
