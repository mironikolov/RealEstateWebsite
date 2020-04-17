import makeUser from '../../models/user-model';
import dataAccess from '../../data-access';
const UsersDb = dataAccess.usersDb;

export default function makeLoginUser( { usersDb = UsersDb } ) {
    return async function loginUser( userInfo: any ) {
        
        return usersDb.login({
            username: userInfo.username
        });
    }
}