import { Request, Response } from 'express';


export default function logoutUser() {
    return ( req: Request, res: Response ) => {
        
        if ( !req.session ) {
            return res.status(500);
        } else {
            req.session.destroy( err => {
                if ( err ) {
                    return res.status(500);
                };
            });
        }
    
        return res.status(201).send({});
    }
}