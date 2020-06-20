import { Request, Response } from 'express';

export default function makeGetUser({ findByIdUser }: { findByIdUser: any }){
    return async function getUser( httpRequest: Request, httpResponse: Response ) {
        try {
            //Извличане на id от заявката
            const userId = httpRequest.params._id;
            //Използване на use case
            const user = await findByIdUser( userId );
            
            //Отговор на заявката
            return httpResponse.status(200).send( user ).end();
        } catch (error) {            
            return httpResponse.status(500).send({ Error: error }).end();
        }
    }
}