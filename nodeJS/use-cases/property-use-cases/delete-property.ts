export default function makeDeleteProperty( propertiesDb: any ){
    return async function deleteProperty( propertyId: string ){
        return propertiesDb.deleteProperty( propertyId );
    }
}