import { Response, NextFunction, Request, Express } from 'express';
import cors from 'cors';

export default ( app: Express ) => {
  app.use( cors({
    origin: ["http://localhost:4200"],
    credentials: true
  }));
}