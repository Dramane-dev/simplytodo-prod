import express, { Router } from "express";
import { createTaskController } from "../../controllers/task/createTaskController";
import { deleteTaskController } from "../../controllers/task/deleteTaskController";
import { getAllTasksController } from "../../controllers/task/getAllTasksController";
import { getTaskByIdController } from "../../controllers/task/getTaskByIdController";
import { updateTaskController } from "../../controllers/task/updateTaskController";
import { verifyToken } from "../../middlewares/verifyToken";

const taskRoute: Router = express.Router();
taskRoute.get("/tasks/:id", [verifyToken], getAllTasksController);
taskRoute.get("/task/:id", [verifyToken], getTaskByIdController);
taskRoute.post("/task/:projectId", [verifyToken], createTaskController);
taskRoute.put("/task/:id", [verifyToken], updateTaskController);
taskRoute.delete("/task/:id", [verifyToken], deleteTaskController);

export { taskRoute };
