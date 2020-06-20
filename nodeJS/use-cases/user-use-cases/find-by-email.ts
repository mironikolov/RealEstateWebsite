
export default function makeFindByEmailUser( usersDb: any ) {
    return async function findByEmailUser( email: string ) {
        
        return usersDb.findByEmail( email );
    }
}