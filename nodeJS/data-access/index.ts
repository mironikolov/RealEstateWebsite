import makeUsersDb from './user-db';
import * as mongodb from 'mongodb';
import environment from '../env/environment';

const MongoClient = mongodb.MongoClient;
const url = environment.DM_USERS_DB_URL;
const client = new MongoClient( url, { useNewUrlParser: true } );

async function makeDb(){
    
    if ( !client.isConnected() ) {

        await client.connect();
    }
    return client.db( environment.DM_USERS_DB_NAME );
}

const usersDb = makeUsersDb( makeDb() ); 
export default usersDb;