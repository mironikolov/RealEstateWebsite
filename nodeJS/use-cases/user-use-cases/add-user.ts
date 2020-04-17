import makeUser from '../../models/user-model';
import dataAccess from '../../data-access';
const UsersDb = dataAccess.usersDb;

export default function makeAddUser( { usersDb = UsersDb } ) {
    return async function addUser( userInfo: any ) {
        const user = makeUser( userInfo );
        
        return usersDb.insert({
            username: user.getUsername(),
            password: user.getPassword(),
            email: user.getEmail(),
            phoneNumber: user.getPhoneNumber(),
            createdOn: user.getCreatedOn()
        });
    }
}