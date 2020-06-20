export default function makeUpdateRating( ratingsDb: any ){
    return async function updateRating( { ...ratingInfo }: { userToRateId: string, userId: string, rating: number } ){
        return ratingsDb.update({
            userToRateId: ratingInfo.userToRateId,
            userId: ratingInfo.userId,
            rating: ratingInfo.rating
        });
    }
}