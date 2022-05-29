import { Request, Response } from "express";
import { Project } from "../../models/Project.model";
interface Project {
    projectId: number;
    name: string;
    description: string;
    userId: number;
}

export const updateProjectController = async (req: Request, res: Response) => {
    let projectId: string = req.params.projectId;

    Project.update(
        {
            name: req.body.projectName,
            description: req.body.projectDescription,
        },
        {
            where: {
                projectId: projectId,
            },
        }
    )
        .then(() => {
            return res.status(200).send({
                message: "Project updated successfully ✅!",
            });
        })
        .catch((error) => {
            return res.send({
                message: error.message + " ❌",
            });
        });
};
