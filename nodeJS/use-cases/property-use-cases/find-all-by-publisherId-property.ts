import dataAccess from '../../data-access';
const PropertiesDb = dataAccess.propertiesDb;

export default function makeFindAllPublisherIdProperty({ propertiesDb = PropertiesDb }){
    return async function findAllByPublisherIdProperty( publisherId: string ){
        return propertiesDb.findAllByPublisherId( publisherId );
    }
}