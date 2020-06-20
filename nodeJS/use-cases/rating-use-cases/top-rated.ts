export default function makeTopRated( ratingsDb: any ){
    return async function topRated( limit: number ){
        return ratingsDb.topRated( limit );
    }
}