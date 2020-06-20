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
            //Връзка към база данни
            const db = await makeDb();
            //Търсене на всички потребители
            const result = await db.collection( 'users' ).find({}).toArray();
            return result;
            
        } catch (error) {
            throw Error;
            
        }
    };

    async function findById(id: string) {
        try {
            //Връзка към база данни
            const db = await makeDb();
            //Търсене на потребител по id
            const result = await db.collection( 'users' ).findOne({ _id: new ObjectId(id) });
            
            return result;
            
        } catch (error) {
            throw Error;
        }
    }

    async function findByEmail( email: string ){
        try {
            //Връзка към база данни
            const db = await makeDb();
            //Търсене на потребител по email
            const result = await db.collection( 'users' ).findOne({ 'email': email });
            
            return result;
        } catch (error) {
            throw Error;
        }
        
    }

    async function findByToken( token: string ){
        try {
            //Връзка към база данни
            const db = await makeDb();
            //Търсене на потребител по token за смяна на парола
            const result = await db.collection( 'users' ).findOne({ 'resetPasswordToken': token });
            
            return result;
        } catch (error) {
            throw Error;
        }
        
    }

    async function login({ username }: { username: string }) {
        try {
            //Връзка към база данни
            const db = await makeDb();
            //Търсене на потребител по email или име
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
            //Връзка към база данни
            const db = await makeDb();
            //Добавяне на потребител
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
            //Връзка към база данни
            const db = await makeDb();
            userInfo._id = new ObjectId( userInfo._id );
            //Обновяване на данни за потребител
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