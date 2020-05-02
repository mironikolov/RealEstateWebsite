import makeUser from '../../models/user-model';
import dataAccess from '../../data-access';
const UsersDb = dataAccess.usersDb;

export default function makeUpdateUser( { usersDb = UsersDb } ) {
    return async function updateUser( {...userInfo} ) {
        const user = makeUser( userInfo );
        
        return usersDb.update({
            _id: user.getId(),
            username: user.getUsername(),
            password: user.getPassword(),
            email: user.getEmail(),
            phoneNumber: user.getPhoneNumber(),
            createdOn: user.getCreatedOn(),
            adminFlag: user.getAdminFlag(),
            resetPasswordToken: user.getResetPasswordToken(),
            resetPasswordExpires: user.getResetPasswordExpires()
        });
    }
}