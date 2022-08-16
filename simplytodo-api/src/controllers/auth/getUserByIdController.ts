import { Request, Response } from "express";
import { IUser } from "../../interfaces/user.interface";
import { User } from "../../models/User.model";

export const getUserByIdController = (req: Request, res: Response) => {
    let userId: string = req.params.userId;

    User.findByPk(userId, { include: ["projects"] })
        .then((user) => {
            if (user) {
                let usr: IUser = {
                    userId: user.getDataValue("userId"),
                    lastname: user.getDataValue("lastname"),
                    firstname: user.getDataValue("firstname"),
                    email: user.getDataValue("email"),
                    bio: user.getDataValue("bio"),
                    password: "",
                    mailConfirmed: user.getDataValue("mailConfirmed"),
                    mailVerificationCode: "",
                    isAuthenticated: user.getDataValue("isAuthenticated")
                };

                return res.status(200).send(usr);
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
