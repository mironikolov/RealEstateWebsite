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

    async function login({ username, password }: { username: string, password: string }) {
        const db = await makeDb;
        const result = await db.collection( 'users' ).findOne({ 'username': username, 'password': password });

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