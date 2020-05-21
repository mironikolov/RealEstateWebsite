import errorResponse from '../error-response';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export default function makePostLoginUser({ loginUser }: { loginUser: any }) {
    return async function postLoginUser( httpRequest: Request, httpResponse: Response ) {
        try {
            const userInfo = httpRequest.body;
            const result = await loginUser({ ...userInfo });
            if( await bcrypt.compare( userInfo.password, result.password ) && httpRequest.session ){
                httpRequest.session.user = result;
                
            } else {
                httpResponse.status(500).send({ Error: "Invalid login" });
            }

            httpResponse.status(200).send( result );
            
        } catch (error) {
            httpResponse.status(500).send({ Error: error });
        }
    }
}