import errorResponse from '../error-response';
import { Request, Response } from 'express';

export default function makeGetByPublisherId({ findAllByPublisherIdProperty }: { findAllByPublisherIdProperty: any }){
    return async function getByPublisherId( httpRequest: Request, httpResponse: Response ) {
        try {
            const publisherId  = httpRequest.params.publisherId;
            const property = await findAllByPublisherIdProperty( publisherId );
            
            return httpResponse.status(200).send( property ).end();
        } catch (error) {            
            return httpResponse.status(500).send({ Error: error }).end();
        }
    }
}