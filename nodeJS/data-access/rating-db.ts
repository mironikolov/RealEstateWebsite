import * as mongodb from 'mongodb';
import { ObjectId } from 'mongodb';

export default function makeRatingDb( makeDb: () => Promise<mongodb.Db> ){
    return Object.freeze({
        insert,
        update,
        averageRating,
        userRating,
        topRated
    });

    async function insert( { ...ratingInfo }: { userToRateId: string, userId: string, rating: number } ){
        try {
                        
            const db = await makeDb();
            const rating = {
                userId: ratingInfo.userId,
                rating: +ratingInfo.rating
            }
            const collection = db.collection( 'users' );
            const userToRateId = new ObjectId( ratingInfo.userToRateId );

            const exist =  await collection.findOne( { _id: userToRateId, ratings:{ $elemMatch: { userId: rating.userId } } } );
            if ( exist != null ) {
                update( ratingInfo );
                return;
            }
        
            const result = await collection.updateOne( { _id: userToRateId }, { $push:{ ratings: rating } } );
            return result;

        } catch (error) {
            return error;
        }

    }

    async function update( { ...ratingInfo }: { userToRateId: string, userId: string, rating: number } ){
        try {
            const db = await makeDb();
            const rating = {
                userId: ratingInfo.userId,
                rating: +ratingInfo.rating
            }
            const collection = db.collection( 'users' );
            const userToRateId = new ObjectId( ratingInfo.userToRateId );
   
            const result = await collection.
            updateOne( { _id: userToRateId , ratings: { $elemMatch: {userId: rating.userId} }}, { $set:{ "ratings.$": rating } } );

            return result;
            
        } catch (error) {
            return error;
        }
    }

    async function averageRating( UserId: string ){
        try {
            
            const db = await makeDb();
            const collection = db.collection( 'users' );
            const userId = new ObjectId( UserId );
            
            const result = await collection
            .aggregate( [{ $match: { _id: userId } }, { $unwind: "$ratings"}, { $group: { _id: userId, rating: { $avg: "$ratings.rating"}} }] )
            .toArray();
            
            return result[0];
            
        } catch (error) {
            return error;
        }
    }

    async function topRated( limit: number ){
        try {
            const db = await makeDb();
            const collection = db.collection( 'users' );
            const result = await collection
            .aggregate( [{ $addFields: { "avg_rating": { $avg: "$ratings.rating" } } },
            { $sort: { avg_rating: -1 }}, { $limit: limit }] ).toArray();
            
            console.log(result);
            
            return result;
        } catch (error) {
            return error;
        }
    }

    async function userRating( RatedUserId: string, UserId: string ){
        try {
            const db = await makeDb();
            const collection = db.collection( 'users' );
            const ratedUserId = new ObjectId( RatedUserId );
            
            const result = await collection
            .findOne( { _id: ratedUserId });

            const rating = result.ratings.find( (rating: any) => rating.userId == UserId);
            if (rating != undefined) {
                return { rating: rating.rating };
            }
            return {};
            
        } catch (error) {
            return error;
        }
    }

}