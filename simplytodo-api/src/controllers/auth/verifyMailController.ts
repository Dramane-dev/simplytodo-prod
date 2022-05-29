import { Request, Response } from "express";
import { deleteMailVerificationCodeFromDb } from "../../functions/auth/deleteMailVerificationCodeFromDb";
import { getUserById } from "../../functions/auth/getUserById";
import { IUser } from "../../interfaces/user.interface";
import { User } from "../../models/User.model";

export const verifyMailController = async (req: Request, res: Response) => {
    let userId: string = req.params.id;
    let mailVerificationCode: string = req.body.mailVerificationCode;
    let actualUser: IUser = await getUserById(userId);

    if (!actualUser.userId) {
        return res.status(404).send({
            message: `User not found where id ${userId} !`,
        });
    }

    if (
        mailVerificationCode === actualUser.mailVerificationCode &&
        actualUser.mailVerificationCode !== null &&
        actualUser.mailVerificationCode !== undefined
    ) {
        User.update(
            {
                mailConfirmed: true,
            },
            {
                where: {
                    userId: userId,
                },
            }
        )
            .then(async () => {
                await deleteMailVerificationCodeFromDb(userId)
                    .then(() => {
                        return res.status(200).send({
                            message: "Mail verified successfully ✅ !",
                        });
                    })
                    .catch((error) => {
                        return res.status(401).send({
                            message: error,
                        });
                    });
            })
            .catch((error) => {
                return res.status(500).send({
                    message: error.message,
                });
            });
    } else {
        return res.status(401).send({
            message: "Invalid mail code verification ❌. Please check your email !",
        });
    }
};
