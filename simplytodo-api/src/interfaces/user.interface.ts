export interface IUser {
    userId: string;
    lastname: string;
    firstname: string;
    email: string;
    password: string;
    bio: string;
    mailVerificationCode: string;
    mailConfirmed: boolean;
    isAuthenticated: boolean;
}
