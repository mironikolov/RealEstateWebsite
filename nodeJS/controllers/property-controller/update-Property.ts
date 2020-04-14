import errorResponse from '../error-response';
import { Request } from 'express';
import fileSystem from '../../file-system';

export default function makeUpdateProperty({ updateProperty }: { updateProperty: any }){
    return async function updataProperty( httpRequest: Request ) {
        try {
            const {...propertyInfo }  = JSON.parse( httpRequest.body.data );
            const property = await updateProperty( propertyInfo );
            
            await fileSystem.editPictures( propertyInfo._id );
            
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