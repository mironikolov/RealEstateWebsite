export default function makeFindProperties( propertiesDb: any ){
    return async function findProperties( {...toFind}, page: number, pageSize: number ){
        return propertiesDb.findProperties( toFind, page, pageSize );
    }
}