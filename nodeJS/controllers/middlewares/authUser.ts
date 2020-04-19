import { Request, Response, NextFunction } from 'express';

export default ( req: Request, res: Response, next: NextFunction ) => {
    if ( req.session && req.session.user ) {
        next();
    } else {
        res.status(403).send({
            errorMessage: 'You must be logged in'
        });
    }
}