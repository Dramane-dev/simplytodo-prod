import { Request, Response } from "express";
import { User } from "../../models/User.model";

export const getUserByIdController = (req: Request, res: Response) => {
    let userId: string = req.params.id;

    User.findByPk(userId, { include: ["projects"] })
        .then((user) => {
            if (user) {
                return res.status(200).send(user);
            } else {
                return res.status(404).send({
                    message: "User not found...",
                });
            }
        })
        .catch((error) => {
            return res.send({
                message: error.message + " ❌",
            });
        });
};
