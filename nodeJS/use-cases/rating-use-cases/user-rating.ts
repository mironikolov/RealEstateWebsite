import dataAccess from '../../data-access';
const RatingsDb = dataAccess.ratingsDb;

export default function makeUserRating( ratingsDb = RatingsDb ){
    return async function userRating( ratedUserId: string,userId: string ){
        return ratingsDb.userRating( ratedUserId, userId );
    }
}