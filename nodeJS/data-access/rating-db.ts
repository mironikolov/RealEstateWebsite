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
            //Връзка към база данни
            const db = await makeDb();
            //Създавана на обект за оценка
            const rating = {
                userId: ratingInfo.userId,
                //+ за смяна на типа към number
                rating: +ratingInfo.rating
            }
            //Избиране на колекция
            const collection = db.collection( 'users' );
            const userToRateId = new ObjectId( ratingInfo.userToRateId );

            //Търсене на оценка
            const exist =  await collection.findOne( { _id: userToRateId, ratings:{ $elemMatch: { userId: rating.userId } } } );
            //Ако им оцентка се обновява
            if ( exist != null ) {
                update( ratingInfo );
                return;
            }
            
            //Добвавяне на оценка
            const result = await collection.updateOne( { _id: userToRateId }, { $push:{ ratings: rating } } );
            return result;

        } catch (error) {
            return error;
        }

    }

    async function update( { ...ratingInfo }: { userToRateId: string, userId: string, rating: number } ){
        try {
            //Връзка към база данни
            const db = await makeDb();
            //Създавана на обект за оценка
            const rating = {
                userId: ratingInfo.userId,
                rating: +ratingInfo.rating
            }
            const collection = db.collection( 'users' );
            const userToRateId = new ObjectId( ratingInfo.userToRateId );
            
            //Обновяване на оценка
            const result = await collection.
            updateOne( { _id: userToRateId , ratings: { $elemMatch: {userId: rating.userId} }}, { $set:{ "ratings.$": rating } } );

            return result;
            
        } catch (error) {
            return error;
        }
    }

    async function averageRating( UserId: string ){
        try {
            //Връзка към база данни
            const db = await makeDb();
            const collection = db.collection( 'users' );
            const userId = new ObjectId( UserId );
            
            //Смятане на средната стойност на оценките
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
            //Връзка към база данни
            const db = await makeDb();
            const collection = db.collection( 'users' );
            //Намиране на най-високо оценяваните потребители
            const result = await collection
            .aggregate( [{ $addFields: { "avg_rating": { $avg: "$ratings.rating" } } },
            { $sort: { avg_rating: -1 }}, { $limit: limit }] ).toArray();
            
            return result;
        } catch (error) {
            return error;
        }
    }

    async function userRating( RatedUserId: string, UserId: string ){
        try {
            //Връзка към база данни
            const db = await makeDb();
            const collection = db.collection( 'users' );
            const ratedUserId = new ObjectId( RatedUserId );
            
            const result = await collection
            .findOne( { _id: ratedUserId });
            
            //Намиране на оценка на потребител
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