//import makeProperty from '../../models/property-model/property';
import dataAccess from '../../data-access';
const PropertiesDb = dataAccess.propertiesDb;

export default function makeFindProperties({ propertiesDb = PropertiesDb }){
    return async function findProperties( {...toFind} ){
        return propertiesDb.findProperties( toFind );
    }
}