import { Resend } from 'resend'
import { Config } from '../config/config.js';

const resend = new Resend(Config.RESEND_EMAIL_KEY);

const sendEmail = async (to, subject, html) => {
    try {
        const { data, error } = await resend.emails.send({
            from: `"Snitch" <${Config.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        if (error) {
            console.error('Resend error:', JSON.stringify(error, null, 2));
            return;
        }

        console.log('Message sent:', data);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export default sendEmail