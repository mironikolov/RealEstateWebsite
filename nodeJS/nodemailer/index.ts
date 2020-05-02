import transporter from './config';
import mailOptions from './mail-options';

export default ( sendTo: string, token: string) => {
    return transporter.sendMail( mailOptions( sendTo, token) );
} 