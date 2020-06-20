export default function makeUserRating( ratingsDb: any ){
    return async function userRating( ratedUserId: string,userId: string ){
        return ratingsDb.userRating( ratedUserId, userId );
    }
}