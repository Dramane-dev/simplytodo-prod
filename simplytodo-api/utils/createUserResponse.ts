import { Model } from "sequelize/dist";
import { IUser } from "../src/interfaces/user.interface";

export const createUserResponse = (data: Model<any, any> | null): IUser => {
    return {
        userId: data?.getDataValue("userId") ?? "",
        lastname: data?.getDataValue("lastname") ?? "",
        firstname: data?.getDataValue("firstname") ?? "",
        email: data?.getDataValue("email") ?? "",
        password: "",
        bio: data?.getDataValue("bio") ?? "",
        mailVerificationCode: "",
        mailConfirmed: data?.getDataValue("mailConfirmed") ?? "",
        isAuthenticated: data?.getDataValue("isAuthenticated") ?? "",
    };
};