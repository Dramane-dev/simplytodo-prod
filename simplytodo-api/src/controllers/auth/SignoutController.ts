import { Request, Response } from "express";
import config from "../../../config/defaults";

export const SignoutController = (req: Request, res: Response) => {
    let refreshToken: string = req.body.refreshToken;
    config.refreshTokens = config.refreshTokens.filter((token) => token !== refreshToken);

    return res.status(200).send({
        message: "User disconnected successfuly ✅!",
    });
};
