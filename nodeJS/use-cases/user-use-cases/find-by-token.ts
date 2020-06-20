export default function makeFindByEmailUser( usersDb: any ) {
    return async function findByEmailUser( token: string ) {
        
        return usersDb.findByToken( token );
    }
}