import ratingService from '../../use-cases/rating-use-cases';
import { Request, Response } from 'express';

export default function makePutRating( updateRating = ratingService.updateRating ){
    return async function putRating ( httpRequest: Request, httpResponse: Response ){
        try {
            const ratingInfo = httpRequest.body;
            const UserId = httpRequest.session?.user._id;
            if ( UserId == undefined ) {
                throw Error('Session error');
            }
            await updateRating( { userToRateId: ratingInfo.userToRateId, userId: UserId, rating: ratingInfo.rating } );
 
            return httpResponse.status( 201 ).send({ message: "Rating updated"});
        } catch ( error ) {
            return httpResponse.status( 500 );
        }
    }
}