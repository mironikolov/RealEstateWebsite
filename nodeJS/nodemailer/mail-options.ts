import env from '../env/environment';

export default ( sendTo: string, token: string ) => {
    return{
        from: env.MAIL_USER, // sender address
        to: sendTo, // list of receivers
        subject: 'Password reset', // Subject line
        html: `<p>Reset your password at: <a href="http://localhost:4200/reset/${token}"> /reset/${token} </a> </p>`// plain text body
    }
  };