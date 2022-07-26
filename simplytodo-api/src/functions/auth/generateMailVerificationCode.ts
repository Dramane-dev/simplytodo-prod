import crypto from "crypto";

export const generateMailVerificationCode = (): string => {
    return crypto.randomBytes(5).toString("hex");
};
