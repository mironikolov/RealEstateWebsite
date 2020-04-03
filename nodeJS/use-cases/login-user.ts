import makeUser from '../user';
import UsersDb from '../data-access';

export default function makeLoginUser( { usersDb = UsersDb } ) {
    return async function loginUser( userInfo: any ) {
        const user = makeUser( userInfo );
        
        return usersDb.login({
            username: user.getUsername(),
            password: user.getPassword()
        });
    }
}