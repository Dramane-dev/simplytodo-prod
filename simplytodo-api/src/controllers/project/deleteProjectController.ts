import { Request, Response } from "express";
import { Project } from "../../models/Project.model";

export const deleteProjectController = async (req: Request, res: Response) => {
    let projectId: string = req.params.id;

    Project.destroy({
        where: {
            projectId: projectId,
        },
    })
        .then((project) => {
            return res.status(200).send({
                message: "Project deleted successfully ✅!",
            });
        })
        .catch((error) => {
            return res.status(403).send({
                message: error.message + " ❌",
            });
        });
};
