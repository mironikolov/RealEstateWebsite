import { Request, Response } from 'express';

export default function makeGetUser({ findByIdUser }: { findByIdUser: any }){
    return async function getUser( httpRequest: Request, httpResponse: Response ) {
        try {
            const userId = httpRequest.params._id;
            const user = await findByIdUser( userId );
            
            return httpResponse.status(200).send( user ).end();
        } catch (error) {            
            return httpResponse.status(500).send({ Error: error }).end();
        }
    }
}