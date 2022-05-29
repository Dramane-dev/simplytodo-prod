import { Request, Response } from "express";
import { Task } from "../../models/Task.model";
import moment from "moment";

export const createTaskController = (req: Request, res: Response) => {
    Task.create({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status ? req.body.status : "todo",
        created_at: moment().format("DD/MM/YYYY HH:mm"),
        projectId: req.params.projectId,
    })
        .then(() => {
            return res.status(200).send({
                message: "Task created successfuly ✅!",
                task: {
                    name: req.body.name,
                    description: req.body.description,
                    createdAt: moment().format("DD/MM/YYYY HH:mm"),
                    projectId: req.params.projectId,
                },
            });
        })
        .catch((error) => {
            let errorMsg: string = error.message;

            if (errorMsg.includes("Cannot add or update a child row")) {
                return res.send({
                    message: "The project id does not exist...",
                });
            }

            return res.send({
                message: error.message + " ❌",
            });
        });
};
