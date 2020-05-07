import errorResponse from '../error-response';
import { Request } from 'express';

export default function makePostFindProperty({ findProperties }: { findProperties: any }){
    return async function postFindProperty( httpRequest: Request ) {
        try {
            const toFind  = httpRequest.body.toFind;
            const page = httpRequest.body.page;
            const pageSize = httpRequest.body.pageSize;
            const property = await findProperties( toFind, page, pageSize );
            
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