import makeProperty from '../../models/property-model';
import dataAccess from '../../data-access';
const PropertiesDb = dataAccess.propertiesDb;

export default function makeDeleteProperty({ propertiesDb = PropertiesDb }){
    return async function deleteProperty( propertyId: string ){
        return propertiesDb.deleteProperty( propertyId );
    }
}