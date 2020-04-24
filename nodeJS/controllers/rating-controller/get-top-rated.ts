import ratingService from '../../use-cases/rating-use-cases';
import { Request, Response } from 'express';

export default function makeGetTopRated( topRated = ratingService.topRated ){
    return async function getTopRated ( httpRequest: Request, httpResponse: Response ){
        try {
            const limit = +httpRequest.params.limit;
            const result = await topRated( limit );
 
            return httpResponse.status( 201 ).send( result );
        } catch ( error ) {
            return httpResponse.status( 500 );
        }
    }
}