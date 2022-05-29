import { Request, Response } from "express";
import { User } from "../../models/User.model";
import { updatePassword } from "../../functions/auth/updatePassword";

export const updateUserInfoController = async (req: Request, res: Response) => {
    let userId: string = req.params.id;
    let userPassword: string = await User.findByPk(userId).then((res) => res?.getDataValue("password"));

    User.update(
        {
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            email: req.body.email,
            password: req.body.password ? updatePassword(req.body.password) : userPassword,
            bio: req.body.bio,
        },
        {
            where: {
                userId: userId,
            },
        }
    )
        .then(() => {
            return res.status(200).send({
                message: "User informations updated successfully ✅!",
            });
        })
        .catch((error) => {
            return res.status(403).send({
                message: error.message + " ❌",
            });
        });
};
