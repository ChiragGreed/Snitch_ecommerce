import { Config } from '../config/config.js';
import sgMail from '@sendgrid/mail'


const sendEmail = async (to, subject, html) => {

    sgMail.setApiKey(Config.SENDGRID_API_KEY);

    const msg = {
        from: `"Snitch" <${Config.GOOGLE_EMAIL_USER}>`,
        to,
        subject,
        html,
    };

    try {
        const [response] = await sgMail.send(msg);
        console.log('Message sent, status code:', response.statusCode);
    } catch (error) {
        console.error('Error sending email:', error);
        if (error.response) {
            console.error(error.response.body);
        }
    }
}

export default sendEmail;
