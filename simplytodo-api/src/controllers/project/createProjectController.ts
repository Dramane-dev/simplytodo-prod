import { Request, Response } from "express";
import { idKeys } from "../../exports/idKeys";
import { generateId } from "../../functions/generateId";
import { Project } from "../../models/Project.model";

export const createProjectController = (req: Request, res: Response) => {
    Project.create({
        projectId: generateId(idKeys[1]),
        name: req.body.name,
        description: req.body.description,
        userId: req.params.id,
    })
        .then(() => {
            res.status(200).send({
                message: "Project created successfuly ✅!",
                todo: {
                    name: req.body.name,
                    description: req.body.description,
                    projectId: req.body.projectId,
                    userId: req.params.id,
                },
            });
        })
        .catch((error) => {
            return res.status(500).send({
                message: error.message + " ❌",
            });
        });
};
