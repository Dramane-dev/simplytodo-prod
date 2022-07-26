export const htmlTemplate: string = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="x-apple-disable-message-reformatting">
        <title></title>
        <!--[if mso]>
    <noscript>
        <xml>
        <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
        <style>
            table,
            td,
            div,
            h1,
            p {
                font-family: Arial, sans-serif;
            }
        </style>
    </head>

    <body style="margin:0;padding:0;">
        <table style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
            <tr>
                <td align="center" style="padding:0;">
                    <table
                        style="width:602px;border-collapse:collapse;border:1px solid #000000;border-radius: 5px;border-spacing:0;text-align:left;">
                        <tr>
                            <td colspan="3" height="40px" style="font-size: 40px; line-height: 40px;" bgcolor="#D291BC">
                                &nbsp;</td>
                        </tr>
                        <tr>
                            <td style="padding:36px 30px 42px 30px;">
                                <table style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                                    <tr>
                                        <td>

                                        <h2>Bonjour user.firstname 👋, <br></h2>

                                            <p>Vous venez de vous inscrire sur l'application  Simply Todo.</p>
                                            
                                            <p>La dernière étape avant de pouvoir utiliser cette application est de vérifier votre email.</p>
                                            
                                            <p> Pour ce faire, il te suffit simplement de le copier/coller dans le champ prévue à cet effet :</p>
                                            <p style="font-weight: bold; text-align:center;">user.mailVerificationCode</p>
                                            
                                            
                                            <p>Cordialement,</p>
                                            
                                            <p> Simply Todo</p>
                                        <!--[if mso]>
                                            <tr><td>&nbsp;</td></tr>
                                        <![endif]-->
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>
`;