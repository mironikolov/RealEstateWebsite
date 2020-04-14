import errorResponse from '../error-response';
import { Request } from 'express';
import fileSystem from '../../file-system';

export default function makeDeleteProperty({ deletePropertyCase }: { deletePropertyCase: any }){
    return async function deleteProperty( httpRequest: Request ) {
        try {
            const propertyId  = httpRequest.body.propertyID;
            
            const result = await deletePropertyCase( propertyId );

            fileSystem.deletePictures( propertyId );
            
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                body: result
            }
        } catch (error) {            
            return errorResponse( error );
        }
    }
}