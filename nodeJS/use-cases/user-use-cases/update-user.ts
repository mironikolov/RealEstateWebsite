import makeUser from '../../models/user-model';

export default function makeUpdateUser( usersDb: any ) {
    return async function updateUser( {...userInfo} ) {
        try {
            //Валидиране на потребителя
            const user = makeUser( userInfo );
            
            //Обновяване на информацията
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
        } catch (error) {
            throw new Error(error);
        }
    }
}