import errorResponse from '../error-response';
import { Request } from 'express';

export default function makeGetUser({ findByIdUser }: { findByIdUser: any }){
    return async function getUser( httpRequest: Request ) {
        try {
            const userId = httpRequest.params._id;
            const user = await findByIdUser( userId );
            
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date( user?.modifiedOn ).toUTCString()
                },
                statusCode: 201,
                body: user
            }
        } catch (error) {            
            return errorResponse( error );
        }
    }
}