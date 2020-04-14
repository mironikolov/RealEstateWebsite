import { Response, NextFunction, Request, Express } from 'express';
import cors from 'cors';

export default ( app: Express ) => {
    //app.use((req: Request, res: Response, next: NextFunction ) => {
      //  res.header("Access-Control-Allow-Origin", "*");
        //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //next();
    //});
    app.use(cors());
}