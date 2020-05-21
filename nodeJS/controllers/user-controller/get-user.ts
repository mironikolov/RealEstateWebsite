import errorResponse from '../error-response';
import { Request, Response } from 'express';

export default function makeGetUser({ findByIdUser }: { findByIdUser: any }){
    return async function getUser( httpRequest: Request, httpResponse: Response ) {
        try {
            const userId = httpRequest.params._id;
            const user = await findByIdUser( userId );
            
            httpResponse.status(200).send( user );
            // return {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Last-Modified': new Date( user?.modifiedOn ).toUTCString()
            //     },
            //     statusCode: 201,
            //     body: user
            // }
        } catch (error) {            
            httpResponse.status(500).send({ Error: error });
        }
    }
}