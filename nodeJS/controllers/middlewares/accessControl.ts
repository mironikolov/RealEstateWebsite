import { Response, NextFunction, Request } from 'express';

export default ( app: any ) => {
    app.use((req: Request, res: Response, next: NextFunction ) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
}