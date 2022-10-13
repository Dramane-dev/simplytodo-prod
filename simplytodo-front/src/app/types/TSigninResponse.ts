export type TSigninResponse = {
    message: string;
    user: {
        userId: string;
        lastname: string;
        firstname: string;
        email: string;
        accessToken: string;
        isAuthenticated: boolean;
        refreshToken: string;
    };
};
