import dataAccess from '../../data-access';
const PropertiesDb = dataAccess.propertiesDb;

export default function makeFindOneByIdProperty({ propertiesDb = PropertiesDb }){
    return async function findOneByIdProperty( propertyId: string ){
        return propertiesDb.findOneById({ propertyId });
    }
}