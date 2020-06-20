export default function makeFindOneByIdProperty( propertiesDb: any ){
    return async function findOneByIdProperty( propertyId: string ){
        return propertiesDb.findOneById({ propertyId });
    }
}