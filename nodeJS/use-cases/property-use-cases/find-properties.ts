//import makeProperty from '../../models/property-model/property';
import dataAccess from '../../data-access';
const PropertiesDb = dataAccess.propertiesDb;

export default function makeFindProperties({ propertiesDb = PropertiesDb }){
    return async function findProperties( {...toFind}, page: number, pageSize: number ){
        return propertiesDb.findProperties( toFind, page, pageSize );
    }
}