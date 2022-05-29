import { User } from "../../models/User.model";

export const deleteMailVerificationCodeFromDb = (userId: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        try {
            User.update(
                {
                    mailVerificationCode: "",
                },
                {
                    where: {
                        userId: userId,
                    },
                }
            ).then(() => {
                resolve(true);
            });
        } catch (error: any) {
            reject(error.message);
        }
    });
};
