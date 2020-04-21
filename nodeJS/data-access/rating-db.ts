import * as mongodb from 'mongodb';
import { ObjectId } from 'mongodb';

export default function makeRatingDb( makeDb: Promise<mongodb.Db> ){
    return Object.freeze({
        insert,
        update,
        averageRating
    });

    async function insert( { ...ratingInfo }: { userToRateId: string, userId: string, rating: number } ){
        const db = await makeDb;
        const rating = {
            userId: ratingInfo.userId,
            rating: ratingInfo.rating
        }
        const collection = db.collection( 'users' );
        const userToRateId = new ObjectId( ratingInfo.userToRateId );
        
        let result;
        try {
            result = await collection.updateOne( { _id: userToRateId }, { $push:{ ratings: rating } } );
        } catch (error) {
            result = error;
        }

        return result;
    }

    async function update( { ...ratingInfo }: { userToRateId: string, userId: string, rating: number } ){
        const db = await makeDb;
        const rating = {
            userId: ratingInfo.userId,
            rating: ratingInfo.rating
        }
        const collection = db.collection( 'users' );
        const userToRateId = new ObjectId( ratingInfo.userToRateId );

        let result;
        try {
            result = await collection.
            updateOne( { _id: userToRateId , ratings: { $elemMatch: {userId: rating.userId} }}, { $set:{ "ratings.$": rating } } );
            
        } catch (error) {
            result = error;
            console.log(error);
        }

        return result;
    }

    async function averageRating( UserId: string ){
        try {
            const db = await makeDb;
            const collection = db.collection( 'users' );
            const userId = new ObjectId( UserId );
            
            const result = await collection
            .aggregate( [{ $match: { _id: userId } }, { $unwind: "$ratings"}, { $group: { _id: userId, avgRating: { $avg: "$ratings.rating"}} }] )
            .toArray();
            
            return result;
            
        } catch (error) {
            return error;
        }
    }
}