import nodemailer from 'nodemailer';
import env from '../env/environment';

export default nodemailer.createTransport({
    host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: env.MAILTRAP_USER,
    pass: env.MAILTRAP_PASS
  }
});