import { User } from "../../models/User.model";
import { Request, Response } from "express";
import { verifyPassword } from "../../functions/auth/verifyPassword";
import { generateToken } from "../../functions/auth/generateToken";
import config from "../../../config/defaults";
import { userIsAuthenticated } from "../../functions/auth/userIsAuthenticated";

export const SigninController = (req: Request, res: Response) => {
    User.findOne({
        where: {
            email: req.body.email.toLowerCase(),
        },
    })
        .then((user) => {
            let password: string = req.body.password;
            let inValidPassword: boolean = !verifyPassword(password, user?.getDataValue("password"));

            if (!user || inValidPassword) {
                return res.status(404).send({
                    message: "Invalid informations ❌!",
                });
            }

            let token: string = generateToken(user?.getDataValue("userId"), String(process.env.ACCESS_TOKEN_SECRET));
            let refreshToken: string = generateToken(
                user?.getDataValue("userId"),
                String(process.env.REFRESH_TOKEN_SECRET)
            );

            config.refreshTokens.push(refreshToken);

            let userId: string = user.getDataValue("userId");
            let isAuthenticated: boolean = true;

            userIsAuthenticated(isAuthenticated, userId)
                .then((response) => {
                    return res.status(200).send({
                        message: "User connected successfuly ✅!",
                        user: {
                            name: user?.getDataValue("name"),
                            email: user?.getDataValue("email"),
                            isAuthenticated: user.getDataValue("isAuthenticated"),
                            accessToken: token,
                            refreshToken: refreshToken,
                        },
                    });
                })
                .catch((error) => {
                    return res.status(200).send({
                        message: `User not connected ${error}`,
                    });
                });
        })
        .catch((error) => {
            if (error.message.includes("data and hash arguments required")) {
                return res.status(404).send({
                    message: "Invalid informations ⚠️",
                });
            } else {
                return res.status(404).send({
                    message: error.message + " ⚠️",
                });
            }
        });
};
