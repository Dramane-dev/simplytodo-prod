import { User } from "../../models/User.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { passwordConfirmed } from "../../functions/auth/passwordConfirmed";
import { IUser } from "../../interfaces/user.interface";
import { sendMailVerificationCode } from "../../functions/auth/sendMailVerificationCode";
import { generateMailVerificationCode } from "../../functions/auth/generateMailVerificationCode";

export const SignupController = (req: Request, res: Response) => {
    let isSamePassword: boolean = passwordConfirmed(req.body.password, req.body.confirmedPassword);

    if (isSamePassword) {
        User.create({
            lastname: req.body.lastname.toLowerCase(),
            firstname: req.body.firstname.toLowerCase(),
            email: req.body.email.toLowerCase(),
            password: bcrypt.hashSync(req.body.password, 12),
            mailVerificationCode: generateMailVerificationCode(),
        })
            .then((result) => {
                let user: IUser = {
                    userId: result.getDataValue("userId"),
                    lastname: result.getDataValue("lastname"),
                    firstname: result.getDataValue("firstname"),
                    email: result.getDataValue("email"),
                    password: "",
                    bio: result.getDataValue("bio"),
                    mailVerificationCode: result.getDataValue("mailVerificationCode"),
                    mailConfirmed: result.getDataValue("mailConfirmed"),
                    isAuthenticated: result.getDataValue("isAuthenticated"),
                };

                sendMailVerificationCode(user)
                    .then((result) => {
                        return result;
                    })
                    .then((result) => {
                        user.mailVerificationCode = "";
                        return res.send({
                            message: "User registred successfuly ✅!",
                            mailToVerification: result ? "Mail to verification sent successfully ✅" : result,
                            user: user,
                        });
                    })
                    .catch((error) => {
                        res.status(500).send({
                            message: error.message,
                        });
                    });
            })
            .catch((error) => {
                let errorResult: string = error.errors[0].message.toString();
                if (errorResult.includes("email must be unique")) {
                    return res.status(400).send({
                        message: errorResult + " ⚠️",
                    });
                }
                return res.status(500).send({
                    message: error.message + " ⚠️",
                });
            });
    } else {
        return res.status(401).send({
            message: "The password is not same to confirmed password ❌",
        });
    }
};
