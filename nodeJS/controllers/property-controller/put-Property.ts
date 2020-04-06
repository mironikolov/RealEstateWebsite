import errorResponse from '../error-response';
import { Request } from 'express';

export default function makePutProperty({ insertProperty }: { insertProperty: any }){
    return async function putProperty( httpRequest: Request ) {
        try {
            const {...propertyInfo }  = httpRequest.body;
            const property = await insertProperty( propertyInfo );
            
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