import errorResponse from '../error-response';
import { Request } from 'express';
import fileSystem from '../../file-system';

export default function makePutProperty({ insertProperty }: { insertProperty: any }){
    return async function putProperty( httpRequest: Request ) {
        try {
            const {...propertyInfo }  = JSON.parse( httpRequest.body.data );

            const property = await insertProperty( propertyInfo );
            
            await fileSystem.addPictures( property.insertedId );
            
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