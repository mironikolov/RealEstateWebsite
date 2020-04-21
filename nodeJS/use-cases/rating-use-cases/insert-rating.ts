import dataAccess from '../../data-access';
const RatingsDb = dataAccess.ratingsDb;

export default function makeAddRating( ratingsDb = RatingsDb ){
    return async function addRating( { ...ratingInfo }: { userToRateId: string, userId: string, rating: number } ){
        return ratingsDb.insert({
            userToRateId: ratingInfo.userToRateId,
            userId: ratingInfo.userId,
            rating: ratingInfo.rating
        });
    }
}