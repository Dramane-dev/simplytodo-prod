import { User } from "../../models/User.model";

export const userIsAuthenticated = (isAuthenticated: boolean, userId: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        User.update(
            {
                isAuthenticated: isAuthenticated,
            },
            {
                where: {
                    userId: userId,
                },
            }
        )
            .then(() => {
                resolve(true);
            })
            .catch((error) => {
                reject(error.message);
            });
    });
};
