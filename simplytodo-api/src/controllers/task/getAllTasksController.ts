import { Request, Response } from "express";
import { Task } from "../../models/Task.model";

export const getAllTasksController = (req: Request, res: Response) => {
    let projectId: string = req.params.id;

    Task.findAll({
        where: {
            projectId: projectId,
        },
    })
        .then((tasks) => {
            if (tasks === null || !(tasks.length > 0)) {
                return res.status(404).send({
                    message: "Tasks not found...",
                });
            }

            return res.status(200).send({
                message: "Tasks getted successfuly ✅!",
                result: tasks,
            });
        })
        .catch((error) => {
            return res.send({
                message: error.message + " ❌",
            });
        });
};
