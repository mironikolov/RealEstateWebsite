import errorResponse from '../error-response';
import { Request } from 'express';

export default function makeGetByIdProperty({ findOneByIdProperty }: { findOneByIdProperty: any }){
    return async function getByIdProperty( httpRequest: Request ) {
        try {
            const propertyId  = httpRequest.params.propertyId;
            const property = await findOneByIdProperty( propertyId );
            
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