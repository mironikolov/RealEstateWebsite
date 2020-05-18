import nodemailer from 'nodemailer';
import env from '../env/environment';

export default nodemailer.createTransport({
  host: "smtp.mail.bg",
  port: 465,
  secure: true,
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS
  }
});