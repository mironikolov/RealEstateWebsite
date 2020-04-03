import makeUser from '../user';
import UsersDb from '../data-access';

export default function makeAddUser( { usersDb = UsersDb } ) {
    return async function addUser( userInfo: any ) {
        const user = makeUser( userInfo );

        return usersDb.insert({
            username: user.getUsername(),
            password: user.getPassword(),
            phoneNumber: user.getPhoneNumber(),
            createdOn: user.getCreatedOn()
        });
    }
}