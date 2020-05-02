import * as mongodb from 'mongodb';
import { ObjectId } from 'mongodb';

export default function makeUsersDb( makeDb:() => Promise<mongodb.Db> ) {
    return Object.freeze({
        findAll,
        findById,
        findByEmail,
        findByToken,
        login,
        insert,
        update
    });
//todo: try/catch
    async function findAll() {
        const db = await makeDb();
        const result = await db.collection( 'users' ).find({}).toArray();
        return result;
    };

    async function findById(id: string) {
        const db = await makeDb();
        const result = await db.collection( 'users' ).findOne({ _id: new ObjectId(id) });
        
        return result;
    }

    async function findByEmail( email: string ){
        try {
            const db = await makeDb();
            const result = await db.collection( 'users' ).findOne({ 'email': email });
            
            return result;
        } catch (error) {
            throw Error;
        }
        
    }

    async function findByToken( token: string ){
        try {
            const db = await makeDb();
            const result = await db.collection( 'users' ).findOne({ 'resetPasswordToken': token });
            
            return result;
        } catch (error) {
            throw Error;
        }
        
    }

    //todo: Change to email
    async function login({ username }: { username: string }) {
        const db = await makeDb();
        const result = await db.collection( 'users' ).findOne({ 'username': username });

        return result;
    }

    async function insert( { ...userInfo } ) {
        const db = await makeDb();
        const result = await db.collection( 'users' ).insertOne({ ...userInfo });
        if ( result.insertedCount === 0 ) {
            return null;
        }
        return result;
    }

    async function update( { ...userInfo }) {
        
        try {
            const db = await makeDb();
            userInfo._id = new ObjectId( userInfo._id );
            const result = await db.collection( 'users' ).updateOne( {_id: userInfo._id }, { $set: { ...userInfo } } );
            if ( result.matchedCount === 0 ) {
                return {};
            }
            return result;
        } catch (error) {
            return error;
        }
    }
}