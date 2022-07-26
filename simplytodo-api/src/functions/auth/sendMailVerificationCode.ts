import sendGridApi from "@sendgrid/mail";
import { IMailResponse } from "../../interfaces/mailResponse.interface";
import { IUser } from "../../interfaces/user.interface";
import { htmlTemplate } from "../../exports/htmlTemplate";
import { User } from "../../models/User.model";

export const sendMailVerificationCode = (user: IUser): Promise<boolean | string> => {
    return new Promise(async (resolve, reject) => {
        try {
            sendGridApi.setApiKey(String(process.env.SEND_GRID_API_KEY));

            let message: sendGridApi.MailDataRequired = {
                from: String(process.env.MAIL_ADDRESS_SEND_GRID),
                to: user.email,
                subject: String(process.env.MAIL_SUBJECT) + " ✅",
                text: `
                    Bonjour ${user.firstname} 👋, \n 
                    
                    Voici le code te permettant de vérifier ton email : ${user.mailVerificationCode}\n
        
                    Il te suffit simplement de le copier/coller dans le champ prévue à cet effet !\n
        
                    Simply Todo
                `,
                html: htmlTemplate
                 .replace("user.firstname", user.firstname)
                 .replace("user.mailVerificationCode", user.mailVerificationCode)
            };
            let mailSent = await sendGridApi.send(message);
            let status = mailSent[0].statusCode;

            if (status === 202) {
                resolve(true);
            }
        } catch (error: any) {
            console.log(error);
            User.destroy({
                where: {
                    userId: user.userId
                }
            })
             .then(() => {
                reject(false);
             })
             .catch(() => {
                reject(false);
             });
        }
    });
};
