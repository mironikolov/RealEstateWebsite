import * as mongodb from 'mongodb';
import { ObjectId } from 'mongodb';

export default function makePropertiesDb( makeDb: Promise<mongodb.Db> ){
    return Object.freeze({
        findAllByRentFlag,
        findAllByPublisherId,
        findOneById,
        insert,
        update,
        deleteProperty
    });

    async function findAllByRentFlag( RentFlag: boolean ){
        const db = await makeDb;
        RentFlag = (String(RentFlag) == "true");
        
        const result = await db.collection( 'properties' ).find({ rentFlag: RentFlag }).toArray();
        
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

    async function insert( propertyInfo: Object ){
        const db = await makeDb;
        const result = await db.collection( 'properties' ).insertOne( propertyInfo );
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

    async function deleteProperty( propertyId: string ){
        const db = await makeDb;
        const result = await db.collection( 'properties' ).deleteOne({ _id : new ObjectId( propertyId ) });
        return result;
    }
}