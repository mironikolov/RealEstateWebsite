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

    async function findAll() {
        try {
            const db = await makeDb();
            const result = await db.collection( 'users' ).find({}).toArray();
            return result;
            
        } catch (error) {
            throw Error;
            
        }
    };

    async function findById(id: string) {
        try {
            const db = await makeDb();
            const result = await db.collection( 'users' ).findOne({ _id: new ObjectId(id) });
            
            return result;
            
        } catch (error) {
            throw Error;
        }
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

    async function login({ username }: { username: string }) {
        try {
            const db = await makeDb();
            if ( username.includes('@') ) {
                return await db.collection( 'users' ).findOne({ 'email': username });    
            }
            else{
                return await db.collection( 'users' ).findOne({ 'username': username });
            }
            
        } catch (error) {
            throw Error;
        }
    }

    async function insert( { ...userInfo } ) {
        try {
            const db = await makeDb();
            const result = await db.collection( 'users' ).insertOne({ ...userInfo });
            if ( result.insertedCount === 0 ) {
                return null;
            }
            return result;
            
        } catch (error) {
            throw Error;
        }
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
            throw Error;
        }
    }
}