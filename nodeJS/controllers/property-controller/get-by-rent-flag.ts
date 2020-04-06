import errorResponse from '../error-response';
import { Request } from 'express';

export default function makeGetByRentFlagProperty({ findAllByRentFlagProperty }: { findAllByRentFlagProperty: any }){
    return async function getByRentFlagProperty( httpRequest: Request ) {
        try {
            const rentFlag  = httpRequest.params.rentFlag;
            const property = await findAllByRentFlagProperty( rentFlag );
            
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