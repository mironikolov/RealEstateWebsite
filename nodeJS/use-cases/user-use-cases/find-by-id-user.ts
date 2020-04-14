import makeUser from '../../models/user-model';
import dataAccess from '../../data-access';
const UsersDb = dataAccess.usersDb;

export default function makeFindByIdUser( { usersDb = UsersDb } ) {
    return async function findByIdUser( userId: string ) {
        
        return usersDb.findById( userId );
    }
}