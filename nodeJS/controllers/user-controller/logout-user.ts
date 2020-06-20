import { Request, Response } from 'express';

export default function logoutUser() {
    return ( req: Request, res: Response ) => {
        
        if ( !req.session ) {
            return res.status(500).end();
        } else {
            //Затваряне на сесия
            req.session.destroy( err => {
                if ( err ) {
                    return res.status(500);
                };
            });
        }
        
        //Отговор на заявка
        return res.status(201).send({}).end();
    }
}