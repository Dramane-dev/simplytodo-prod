import jwt from "jsonwebtoken";

export const generateToken = (userId: string, secret: string): string => {
    return jwt.sign({ id: userId }, secret);
};
