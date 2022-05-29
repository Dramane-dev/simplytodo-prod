import { Request, Response } from "express";
import { Task } from "../../models/Task.model";

export const deleteTaskController = (req: Request, res: Response) => {
    let id: string = req.params.id;

    Task.destroy({
        where: {
            id: id,
        },
    })
        .then(() => {
            return res.status(200).send({
                message: "Task deleted successfully ✅!",
            });
        })
        .catch((error) => {
            return res.send({
                message: error.message + " ❌",
            });
        });
};
