import nodemailer, { SentMessageInfo } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { IMailResponse } from "../../interfaces/mailResponse.interface";
import { IUser } from "../../interfaces/user.interface";

export const sendMailVerificationCode = (user: IUser): Promise<boolean | string> => {
    return new Promise(async (resolve, reject) => {
        try {
            let transport: Mail<SentMessageInfo> = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: parseInt(String(process.env.MAIL_PORT)),
                secure: false,
                auth: {
                    user: process.env.MAIL_ADDRESS,
                    pass: process.env.MAIL_PASSWORD,
                },
                tls: {
                    ciphers: process.env.MAIL_TLS,
                },
            });

            let message: IMailResponse = await transport.sendMail({
                from: process.env.MAIL_ADDRESS,
                to: user.email,
                subject: process.env.MAIL_SUBJECT + " ✅",
                text: `
                    Bonjour ${user.firstname} 👋, \n 
                    
                    Voici le code te permettant de vérifier ton email : ${user.mailVerificationCode}\n
        
                    Il te suffit simplement de le copier/coller dans le champ prévue à cet effet !\n
        
                    Simply Todo
                `,
            });

            let status = message.response.split(" ")[2];

            if (status === "OK") {
                resolve(true);
            }

            reject(false);
        } catch (error: any) {
            reject(error.message);
        }
    });
};
