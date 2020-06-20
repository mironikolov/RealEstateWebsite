export default function makeLoginUser( usersDb: any ) {
    return async function loginUser( userInfo: any ) {
        
        return usersDb.login({
            username: userInfo.username
        });
    }
}