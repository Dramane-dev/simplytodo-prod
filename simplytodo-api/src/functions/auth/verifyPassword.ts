import bcrypt from "bcrypt";

export const verifyPassword = (password: string, user: string): boolean => {
    return bcrypt.compareSync(password, user);
};
