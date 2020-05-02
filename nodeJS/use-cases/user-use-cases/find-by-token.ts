import dataAccess from '../../data-access';
const UsersDb = dataAccess.usersDb;

export default function makeFindByEmailUser( { usersDb = UsersDb } ) {
    return async function findByEmailUser( token: string ) {
        
        return usersDb.findByToken( token );
    }
}