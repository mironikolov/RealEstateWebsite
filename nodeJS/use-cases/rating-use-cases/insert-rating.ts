export default function makeAddRating( ratingsDb: any ){
    return async function addRating( { ...ratingInfo }: { userToRateId: string, userId: string, rating: number } ){
        return ratingsDb.insert({
            userToRateId: ratingInfo.userToRateId,
            userId: ratingInfo.userId,
            rating: ratingInfo.rating
        });
    }
}