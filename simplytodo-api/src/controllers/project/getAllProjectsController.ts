import { Request, Response } from "express";
import { Project } from "../../models/Project.model";

export const getAllProjectsController = (req: Request, res: Response) => {
    let userId: string = req.params.id;

    Project.findAll({
        include: ["tasks"],
        where: {
            userId: userId,
        },
    })
        .then((projects) => {
            res.status(200).send({
                message: "Projects getted successfuly ✅!",
                result: projects,
            });
        })
        .catch((error) => {
            return res.send({
                message: "No projects created ...",
            });
        });
};
