import makeProperty from '../../models/property-model';
import dataAccess from '../../data-access';
const PropertiesDb = dataAccess.propertiesDb;

export default function makeInsertProperty({ propertiesDb = PropertiesDb }){
    return async function insertProperty( propertyInfo: any ){
        const property = makeProperty( propertyInfo );
        
        return propertiesDb.insert({
            _id: property.getId(),
            title: property.getTitle(),
            address: property.getAddress(),
            area: property.getArea(),
            price: property.getPrice(),
            rooms: property.getRooms(),
            type: property.getType(),
            tags: property.getTags(),
            extraInfo: property.getExtraInfo(),
            createdOn: property.getCreatedOn(),
            publisherId: property.getPublisherId(),
            picturesNames: property.getPicturesNames(),
            picturesUrl: property.getPicturesUrl(),
            rentFlag: property.getRentFlag()
        });
    }
}