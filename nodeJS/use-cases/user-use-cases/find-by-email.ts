import dataAccess from '../../data-access';
const UsersDb = dataAccess.usersDb;

export default function makeFindByEmailUser( { usersDb = UsersDb } ) {
    return async function findByEmailUser( email: string ) {
        
        return usersDb.findByEmail( email );
    }
}