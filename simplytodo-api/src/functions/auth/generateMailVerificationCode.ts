import crypto from "crypto";

export const generateMailVerificationCode = (): string => {
    return crypto.randomBytes(10).toString("hex");
};
