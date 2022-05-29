import { Request, Response } from "express";
import { User } from "../../models/User.model";

export const getAllUsersController = (req: Request, res: Response) => {
    User.findAll({ include: ["projects"] })
        .then((user) => {
            if (user) {
                return res.status(200).send(user);
            } else {
                return res.status(404).send({
                    message: "No users registred in database...",
                });
            }
        })
        .catch((error) => {
            return res.send({
                message: error.message + " ❌",
            });
        });
};
