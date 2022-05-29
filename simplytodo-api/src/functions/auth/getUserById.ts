import { IUser } from "../../interfaces/user.interface";
import { User } from "../../models/User.model";

export const getUserById = (userId: string): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        try {
            User.findByPk(userId).then((user) => {
                let actualUser: IUser = {
                    userId: user?.getDataValue("userId"),
                    lastname: user?.getDataValue("lastname"),
                    firstname: user?.getDataValue("firstname"),
                    email: user?.getDataValue("email"),
                    password: user?.getDataValue("password"),
                    bio: user?.getDataValue("bio"),
                    mailVerificationCode: user?.getDataValue("mailVerificationCode"),
                    mailConfirmed: user?.getDataValue("mailConfirmed"),
                    isAuthenticated: user?.getDataValue("isAuthenticated"),
                };

                resolve(actualUser);
            });
        } catch (error: any) {
            reject(error.message);
        }
    });
};
