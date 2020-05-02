import { Request, Response } from 'express';
import UserService from '../../use-cases/user-use-cases';
import crypto from 'crypto';
import mailTransporter from '../../nodemailer';

export default function passwordReset( userService = UserService ) {
    return async ( req: Request, res: Response ) => {
        try {
            
            if ( !req.body.email ) {
                return res.status(400).send('request body is missing');
            }
    
            const user = await userService.findByEmailUser( req.body.email );
            if (!user) {
                return res.status(500).send('no such user');
            }
            const token = crypto.randomBytes(20).toString('hex');
            const result = 
            await userService.updateUser( {...user, resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000} ) //expires after 1 hour
            const emailResult = await mailTransporter( user.email, token );
            
            return res.status(201).send({});

        } catch (error) {
            throw Error;
        }
    }
}