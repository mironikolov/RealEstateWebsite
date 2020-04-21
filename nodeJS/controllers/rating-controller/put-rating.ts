import ratingService from '../../use-cases/rating-use-cases';
import { Request, Response } from 'express';

export default function makePutRating( updateRating = ratingService.updateRating ){
    return async function putRating ( httpRequest: Request, httpResponse: Response ){
        try {
            const ratingInfo = httpRequest.body;
            const result = await updateRating( { userToRateId: ratingInfo.userToRateId, userId: ratingInfo.userId, rating: ratingInfo.rating } );
 
            return httpResponse.status( 201 ).send("Rating updated");
        } catch ( error ) {
            return httpResponse.status( 500 );
        }
    }
}