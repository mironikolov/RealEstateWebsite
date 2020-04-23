import ratingService from '../../use-cases/rating-use-cases';
import { Request, Response } from 'express';

export default function makeGetUserating( averageRating = ratingService.userRating ){
    return async function getUserating ( httpRequest: Request, httpResponse: Response ){
        try { 
            const userId = httpRequest.session?.user._id;
            if (userId == undefined) {
                throw Error('Session error');
            }
            const ratedUserId = httpRequest.params.ratedUserId;
            const result = await averageRating( ratedUserId, userId );
 
            return httpResponse.status( 201 ).send( result );
        } catch ( error ) {
            return httpResponse.status( 500 );
        }
    }
}