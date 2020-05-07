import * as mongodb from 'mongodb';
import { ObjectId } from 'mongodb';

export default function makePropertiesDb( makeDb: () => Promise<mongodb.Db> ){
    return Object.freeze({
        findProperties,
        findAllByPublisherId,
        findOneById,
        insert,
        update,
        deleteProperty
    });

    async function findProperties( { ...toFind }, page: number, pageSize: number ){
        const db = await makeDb();

        if( toFind._id ){
            toFind._id = new ObjectId( toFind._id );
        }

        if ( toFind.tags ) {
            toFind.tags = { $all: toFind.tags };
        }
        
        const skips = pageSize * ( page - 1 );
        const result = await db.collection( 'properties' ).find({ ...toFind }).sort({ _id: -1 }).skip( skips ).limit( pageSize ).toArray();
        const resultCount = await db.collection( 'properties' ).find({ ...toFind }).count();
        
        return { 'result': result, 'resultCount': resultCount};
    }

    async function findAllByPublisherId( publisherID: string ){
        const db = await makeDb();
        const result = await db.collection( 'properties' ).find({ publisherId: publisherID }).toArray();

        return result;
    }

    async function findOneById({ propertyId }: { propertyId: string }){
        const db = await makeDb();
        const result = await db.collection( 'properties' ).findOne({ _id: new ObjectId( propertyId ) });
        return result;
    }

    async function insert( propertyInfo: Object ){
        const db = await makeDb();
        const result = await db.collection( 'properties' ).insertOne( propertyInfo );
        if ( result.insertedCount === 0 ) {
            return null;
        }
        
        return result;
    }

    async function update({ ...propertyInfo }){
        const db = await makeDb();
        propertyInfo._id = new ObjectId( propertyInfo._id );
        
        const result = await db.collection( 'properties' ).updateOne({ _id : propertyInfo._id }, { $set:{ ...propertyInfo } });
        if ( result.matchedCount === 0 ) {
            return null;
        }
        return result;
    }

    async function deleteProperty( propertyId: string ){
        const db = await makeDb();
        const result = await db.collection( 'properties' ).deleteOne({ _id : new ObjectId( propertyId ) });
        return result;
    }
}