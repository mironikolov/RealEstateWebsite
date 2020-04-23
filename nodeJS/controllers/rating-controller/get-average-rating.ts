import ratingService from '../../use-cases/rating-use-cases';
import { Request, Response } from 'express';

export default function makeGetAverageRating( averageRating = ratingService.averageRating ){
    return async function getAverageRating ( httpRequest: Request, httpResponse: Response ){
        try {
            const userId = httpRequest.params.userId;
            const result = await averageRating( userId );
 
            return httpResponse.status( 201 ).send( result );
        } catch ( error ) {
            return httpResponse.status( 500 );
        }
    }
}