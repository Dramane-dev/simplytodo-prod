import express, { Router } from "express";
import { createTaskController } from "../../controllers/task/createTaskController";
import { deleteTaskController } from "../../controllers/task/deleteTaskController";
import { getAllTasksController } from "../../controllers/task/getAllTasksController";
import { getTaskByIdController } from "../../controllers/task/getTaskByIdController";
import { updateTaskController } from "../../controllers/task/updateTaskController";
import { verifyToken } from "../../middlewares/verifyToken";

const taskRoute: Router = express.Router();
taskRoute.get("/api/tasks/:id", [verifyToken], getAllTasksController);
taskRoute.get("/api/task/:id", [verifyToken], getTaskByIdController);
taskRoute.post("/api/task/:projectId", [verifyToken], createTaskController);
taskRoute.put("/api/task/:id", [verifyToken], updateTaskController);
taskRoute.delete("/api/task/:id", [verifyToken], deleteTaskController);

export { taskRoute };
