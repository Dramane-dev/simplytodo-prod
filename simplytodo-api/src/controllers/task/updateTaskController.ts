import { Request, Response } from "express";
import { Task } from "../../models/Task.model";

export const updateTaskController = (req: Request, res: Response) => {
    let id: string = req.params.id;
    let projectId: string = req.params.projectId;

    Task.update(
        {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            projectId: projectId,
        },
        {
            where: {
                id: id,
            },
        }
    )
        .then((result) => {
            // if (result[0] === 0) {
            //     return res.status(500).send({
            //         message: "Task id does not exist into database ❌!"
            //     });
            // }

            return res.status(200).send({
                message: "Task updated successfully ✅!",
            });
        })
        .catch((error) => {
            return res.send({
                message: error.message + " ❌",
            });
        });
};
