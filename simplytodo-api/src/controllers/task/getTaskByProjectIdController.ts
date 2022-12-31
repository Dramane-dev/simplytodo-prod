import { Request, Response } from "express";
import { Project } from "../../models/Project.model";

export const getTaskByProjectIdController = (req: Request, res: Response) => {
    let projectId: string = req.params.projectId;

    Project.findByPk(projectId, { include: ["tasks"] })
        .then((project) => {
            if (project === null) {
                return res.status(404).send({
                    message: "Task not found...",
                });
            }

            return res.status(200).send(project.getDataValue("tasks"));
        })
        .catch((error) => {
            console.log(error)
            return res.send({
                message: error.message + " ❌",
            });
        });
};
