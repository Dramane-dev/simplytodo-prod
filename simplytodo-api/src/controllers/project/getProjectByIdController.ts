import { Request, Response } from "express";
import { Project } from "../../models/Project.model";

export const getProjectByIdController = (req: Request, res: Response) => {
    let projectId: string = req.params.id;

    Project.findByPk(projectId, { include: ["tasks"] })
        .then((project) => {
            if (project === null) {
                res.status(404).send({
                    message: "Project not found...",
                });
            }
            return res.status(200).send(project);
        })
        .catch((error) => {
            return res.status(404).send({
                message: error.message + " ❌",
            });
        });
};
