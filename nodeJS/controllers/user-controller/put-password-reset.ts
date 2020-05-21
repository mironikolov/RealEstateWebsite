import { Request, Response } from 'express';
import UserService from '../../use-cases/user-use-cases';
import bcrypt from 'bcrypt';

export default function putPasswordReset( userService = UserService ) {
    return async ( req: Request, res: Response ) => {
        try {
            if ( !req.body ) {
                return res.status(400).send('request body is missing').end();
            }
    
            const user = await userService.findByTokenUser( req.body.token );
            if (!user) {
                return res.status(500).send('no such user').end();
            }

            if ( user.resetPasswordExpires < Date.now() ) {
                return res.status(500).send('token expired').end();
            }
    
            const hashedPassword = await bcrypt.hash( req.body.password, 10 );
            user.password = hashedPassword;
            user.resetPasswordExpires = undefined;
            user.resetPasswordToken = undefined;
    
            const result = 
            await userService.updateUser( { ...user } );
            
            return res.status(201).send({}).end();
            
        } catch (error) {
            return res.status(500).send({ Error: error }).end();
        }
        
    }
}