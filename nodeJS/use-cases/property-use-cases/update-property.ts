import makeProperty from '../../models/property-model';

export default function makeUpdateProperty( propertiesDb: any ){
    return async function updateProperty( propertyInfo: any ){
        //Задаване на стойности по подразбиране
        const property = makeProperty( propertyInfo );

        //Обновяване на обявата
        return propertiesDb.update({
            _id: property.getId(),
            title: property.getTitle(),
            address: property.getAddress(),
            city: property.getCity(),
            district: property.getDistrict(),
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