import { Request, Response } from "express";
import { Task } from "../../models/Task.model";

export const getTaskByIdController = (req: Request, res: Response) => {
    let id: string = req.params.id;

    Task.findByPk(id)
        .then((task) => {
            if (task === null) {
                return res.status(404).send({
                    message: "Task not found...",
                });
            }

            return res.status(200).send(task);
        })
        .catch((error) => {
            return res.send({
                message: error.message + " ❌",
            });
        });
};
