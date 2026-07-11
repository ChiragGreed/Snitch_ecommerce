import nodemailer from 'nodemailer';
import { Config } from '../config/config.js';

const transporter = nodemailer.createTransport({
    host: '://gmail.com',
    port: 587,
    secure: false,
    auth: {
        type: 'oAuth2',
        user: Config.GOOGLE_EMAIL_USER,
        clientId: Config.GOOGLE_CLIENT_ID,
        clientSecret: Config.GOOGLE_CLIENT_SECRET,
        refreshToken: Config.GOOGLE_REFRESH_TOKEN
    },
    connectionTimeout: 10000,
    tls: {
        rejectUnauthorized: false
    }
})

transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
})

const sendEmail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
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
