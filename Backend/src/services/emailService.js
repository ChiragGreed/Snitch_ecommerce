import { Resend } from 'resend'
import { Config } from '../config/config.js';

const resend = new Resend(Config.RESEND_EMAIL_KEY);

const sendEmail = async (to, subject, html) => {
    try {
        const info = await Resend.emails.send({
            from: `"Snitch" <${Config.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export default sendEmail