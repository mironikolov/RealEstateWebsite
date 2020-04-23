import errorResponse from '../error-response';
import { Request } from 'express';

export default function makeGetByPublisherId({ findAllByPublisherIdProperty }: { findAllByPublisherIdProperty: any }){
    return async function getByPublisherId( httpRequest: Request ) {
        try {
            const publisherId  = httpRequest.params.publisherId;
            const property = await findAllByPublisherIdProperty( publisherId );
            
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                body:  property 
            }
        } catch (error) {            
            return errorResponse( error );
        }
    }
}