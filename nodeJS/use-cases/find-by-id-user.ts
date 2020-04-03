import makeUser from '../user';
import UsersDb from '../data-access';

export default function makeFindByIdUser( { usersDb = UsersDb } ) {
    return async function findByIdUser( userInfo: any ) {
        const user = makeUser( userInfo.params );
        
        return usersDb.findById({
            id: user.getId()
        });
    }
}