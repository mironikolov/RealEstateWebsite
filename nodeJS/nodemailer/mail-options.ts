export default ( sendTo: string, token: string ) => {
    return{
        from: 'sender@email.com', // sender address
        to: sendTo, // list of receivers
        subject: 'Password reset', // Subject line
        html: `<p>Reset your password at: http://localhost:4200/reset/${token}</p>`// plain text body
    }
  };