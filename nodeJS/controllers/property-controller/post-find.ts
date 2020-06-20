import { Request, Response } from 'express';

export default function makePostFindProperty({ findProperties }: { findProperties: any }){
    return async function postFindProperty( httpRequest: Request, httpResponse: Response ) {
        try {
            const toFind  = httpRequest.body.toFind;
            const page = httpRequest.body.page;
            const pageSize = httpRequest.body.pageSize;
            
            const property = await findProperties( toFind, page, pageSize );
            
            return httpResponse.status(200).send( property ).end();
        } catch (error) {            
            return httpResponse.status(500).send({ Error: error }).end();
        }
    }
}