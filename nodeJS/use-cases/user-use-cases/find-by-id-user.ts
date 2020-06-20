export default function makeFindByIdUser( usersDb: any ) {
    return async function findByIdUser( userId: string ) {
        
        return usersDb.findById( userId );
    }
}