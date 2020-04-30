import errorResponse from '../error-response';
import { Request } from 'express';

export default function makePostFindProperty({ findProperties }: { findProperties: any }){
    return async function postFindProperty( httpRequest: Request ) {
        try {
            const toFind  = httpRequest.body;
            const property = await findProperties( toFind );
            
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                body: property
            }
        } catch (error) {            
            return errorResponse( error );
        }
    }
}