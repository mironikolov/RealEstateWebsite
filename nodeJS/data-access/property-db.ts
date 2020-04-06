import * as mongodb from 'mongodb';
import { ObjectId } from 'mongodb';

export default function makePropertiesDb( makeDb: Promise<mongodb.Db> ){
    return Object.freeze({
        findAllByRentFlag,
        findAllByPublisherId,
        findOneById,
        insert,
        update
    });

    async function findAllByRentFlag( rentFlag: boolean ){
        const db = await makeDb;
        const flag = Boolean( rentFlag );
        const result = await db.collection( 'properties' ).find({ rentFlag: flag }).toArray();
        
        return result;
    }

    async function findAllByPublisherId( publisherID: string ){
        const db = await makeDb;
        const result = await db.collection( 'properties' ).find({ publisherId: publisherID }).toArray();

        return result;
    }

    async function findOneById({ propertyId }: { propertyId: string }){
        const db = await makeDb;
        const result = await db.collection( 'properties' ).findOne({ _id: new ObjectId( propertyId ) });
        return result;
    }

    async function insert({ ...propertyInfo }){
        const db = await makeDb;
        const result = await db.collection( 'properties' ).insertOne({ ...propertyInfo });
        if ( result.insertedCount === 0 ) {
            return null;
        }
        return result;
    }

    async function update({ ...propertyInfo }){
        const db = await makeDb;
        propertyInfo._id = new ObjectId( propertyInfo._id );
        const result = await db.collection( 'properties' ).updateOne({ _id : propertyInfo._id }, { $set:{ ...propertyInfo } });
        if ( result.matchedCount === 0 ) {
            return null;
        }
        return result;
    }
}