import { Request, Response } from 'express';
import UserService from '../../use-cases/user-use-cases';
import crypto from 'crypto';
import mailTransporter from '../../nodemailer';

export default function passwordReset( userService = UserService ) {
    return async ( req: Request, res: Response ) => {
        try {
            //Проверка за email
            if ( !req.body.email ) {
                return res.status(400).send('request body is missing').end();
            }
            
            //Използване на use case
            const user = await userService.findByEmailUser( req.body.email );

            //Проверка за съществуване на потребител
            if (!user) {
                return res.status(500).send('no such user').end();
            }
            //Генериране на token
            const token = crypto.randomBytes(20).toString('hex');
            //Добавяне на token и време за валидност към потребителя
            const result = 
            await userService.updateUser( {...user, resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000} ) //expires after 1 hour
            //Изпращане на email
            const emailResult = await mailTransporter( user.email, token );
            
            //Отговор на заявката
            return res.status(201).send({}).end();

        } catch (error) {
            console.log(error);
        }
    }
}