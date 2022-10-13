export type TUser = {
    userId: number | string;
    lastname: string;
    firstname: string;
    email: string;
    password: string;
    mailConfirmed: boolean;
    mailVerificationCode: string;
    accessToken: string;
    isAuthenticated: boolean;
    bio?: string;
};
