import dataAccess from '../../data-access';
const RatingsDb = dataAccess.ratingsDb;

export default function makeAverageRating( ratingsDb = RatingsDb ){
    return async function avarageRating( userId: string ){
        return ratingsDb.averageRating( userId );
    }
}