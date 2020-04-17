import * as mongodb from 'mongodb';
import { ObjectId } from 'mongodb';

export default function makeUsersDb( makeDb: Promise<mongodb.Db> ) {
    return Object.freeze({
        findAll,
        findById,
        login,
        insert
        //update
    });

    async function findAll() {
        const db = await makeDb;
        const result = await db.collection( 'users' ).find({}).toArray();
        return result;
    };

    async function findById(id: string) {
        const db = await makeDb;
        const result = await db.collection( 'users' ).findOne({ _id: new ObjectId(id) });
        
        return result;
    }

    //todo: Change to email
    async function login({ username }: { username: string }) {
        const db = await makeDb;
        const result = await db.collection( 'users' ).findOne({ 'username': username });

        return result;
    }

    async function insert( { ...userInfo } ) {
        const db = await makeDb;
        const result = await db.collection( 'users' ).insertOne({ ...userInfo });
        if ( result.insertedCount === 0 ) {
            return null;
        }
        return result;
    }
}