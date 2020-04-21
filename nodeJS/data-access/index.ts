import makeUsersDb from './user-db';
import * as mongodb from 'mongodb';
import environment from '../env/environment';
import makePropertiesDb from './property-db';
import makeRatingsDb from './rating-db';

const MongoClient = mongodb.MongoClient;
const url = environment.DB_URL;
const client = new MongoClient( url, { useNewUrlParser: true } );

async function makeDb(){
    
    if ( !client.isConnected() ) {

        await client.connect();
    }
    return client.db( environment.DB_NAME );
}

const usersDb = makeUsersDb( makeDb() );
const propertiesDb = makePropertiesDb( makeDb() );
const ratingsDb = makeRatingsDb( makeDb() );
export default { usersDb, propertiesDb, ratingsDb };