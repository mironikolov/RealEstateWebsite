import makeUser from '../../models/user-model';

export default function makeAddUser( usersDb: any ) {
    return async function addUser( userInfo: any ) {
        try {
            //Валидация на данните
            const user = makeUser( userInfo );
            
            //Запис в базата данни
            return usersDb.insert({
                username: user.getUsername(),
                password: user.getPassword(),
                email: user.getEmail(),
                phoneNumber: user.getPhoneNumber(),
                createdOn: user.getCreatedOn(),
                adminFlag: user.getAdminFlag()
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}