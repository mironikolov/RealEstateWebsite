import dataAccess from '../../data-access';
const RatingsDb = dataAccess.ratingsDb;

export default function makeTopRated( ratingsDb = RatingsDb ){
    return async function topRated( limit: number ){
        return ratingsDb.topRated( limit );
    }
}