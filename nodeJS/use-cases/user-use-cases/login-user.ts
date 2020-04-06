import makeUser from '../../models/user-model';
import dataAccess from '../../data-access';
const UsersDb = dataAccess.usersDb;

export default function makeLoginUser( { usersDb = UsersDb } ) {
    return async function loginUser( userInfo: any ) {
        const user = makeUser( userInfo );
        
        return usersDb.login({
            username: user.getUsername(),
            password: user.getPassword()
        });
    }
}