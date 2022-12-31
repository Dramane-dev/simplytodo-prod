import express, { Router } from "express";
import { createTaskController } from "../../controllers/task/createTaskController";
import { deleteTaskController } from "../../controllers/task/deleteTaskController";
import { getAllTasksController } from "../../controllers/task/getAllTasksController";
import { getTaskByIdController } from "../../controllers/task/getTaskByIdController";
import { getTaskByProjectIdController } from "../../controllers/task/getTaskByProjectIdController";
import { updateTaskController } from "../../controllers/task/updateTaskController";
import { verifyToken } from "../../middlewares/verifyToken";

const taskRoutes: Router = express.Router();
taskRoutes.get("/tasks/:id", [verifyToken], getAllTasksController);
taskRoutes.get("/task/:id", [verifyToken], getTaskByIdController);
taskRoutes.get("/project/task/:projectId", [verifyToken], getTaskByProjectIdController);
taskRoutes.post("/task/:projectId", [verifyToken], createTaskController);
taskRoutes.put("/task/:id", [verifyToken], updateTaskController);
taskRoutes.delete("/task/:id", [verifyToken], deleteTaskController);

export { taskRoutes };
