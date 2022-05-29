import { Request, Response } from "express";
import { User } from "../../models/User.model";
import jwt, { Secret } from "jsonwebtoken";
import { IUser } from "../../interfaces/user.interface";
import { getUserById } from "../../functions/auth/getUserById";

export const isAuthenticatedController = async (req: Request, res: Response) => {
    let tokenFromAuthHeader: string = req.headers["authorization"] as string;
    let token: string = tokenFromAuthHeader && tokenFromAuthHeader.split(" ")[1];
    let userId: string = req.params.id;
    let user: IUser = await getUserById(userId);

    if (!token) {
        return res.status(403).send({
            message: "No token provided ❌ !",
        });
    }

    let secret: Secret = process.env.ACCESS_TOKEN_SECRET as Secret;

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unhauthorized ❌ !",
            });
        }

        if (decoded !== undefined && user.isAuthenticated) {
            return res.status(200).send({
                message: "User authenticated ✅",
            });
        }
    });
};
