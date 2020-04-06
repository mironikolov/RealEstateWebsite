//import makeProperty from '../../models/property-model/property';
import dataAccess from '../../data-access';
const PropertiesDb = dataAccess.propertiesDb;

export default function makeFindAllByRentFlagProperty({ propertiesDb = PropertiesDb }){
    return async function findAllByRentFlagProperty( rentFlag: boolean ){
        return propertiesDb.findAllByRentFlag( rentFlag );
    }
}