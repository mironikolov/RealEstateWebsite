import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export default function makePostLoginUser({ loginUser }: { loginUser: any }) {
    return async function postLoginUser( httpRequest: Request, httpResponse: Response ) {
        try {
            const userInfo = httpRequest.body;
            const result = await loginUser({ ...userInfo });
            //Създаване на сесия, ако паролата съвпада
            if( await bcrypt.compare( userInfo.password, result.password ) && httpRequest.session ){
                httpRequest.session.user = result;
                
            } else {
                return httpResponse.status(401).send({ Error: "Invalid login" }).end();
            }

            return httpResponse.status(200).send( result ).end();
            
        } catch (error) {
            return httpResponse.status(500).send({ Error: error }).end();
        }
    }
}