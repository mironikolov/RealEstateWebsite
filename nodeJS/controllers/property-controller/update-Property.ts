import errorResponse from '../error-response';
import { Request } from 'express';

export default function makeUpdateProperty({ updateProperty }: { updateProperty: any }){
    return async function updataProperty( httpRequest: Request ) {
        try {
            const {...propertyInfo }  = httpRequest.body;
            const property = await updateProperty( propertyInfo );
            
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                body: { property }
            }
        } catch (error) {            
            return errorResponse( error );
        }
    }
}