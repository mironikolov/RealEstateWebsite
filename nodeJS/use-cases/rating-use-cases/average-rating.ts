export default function makeAverageRating( ratingsDb: any ){
    return async function avarageRating( userId: string ){
        return ratingsDb.averageRating( userId );
    }
}