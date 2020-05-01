import { ObjectID } from "mongodb";

export default function buildMakeProperty(){
    return function makeProperty({
        _id = new ObjectID(),
        title = '',
        address = '',
        city = '',
        district = '',
        area = '',
        price = 0,
        rooms = 0,
        type = '',
        tags = Array<string>(),
        extraInfo = '',
        createdOn = Date.now(),
        publisherId = '',
        picturesNames = Array<string>(),
        picturesUrl = Array<any>(),
        rentFlag = new Boolean()
    }) {

        return Object.freeze({
            getId: () => _id,
            getTitle: () => title,
            getAddress: () => address,
            getCity: () => city,
            getDistrict: () => district,
            getArea: () => area,
            getPrice: () => price,
            getRooms: () => rooms,
            getType: () => type,
            getTags: () => tags,
            getExtraInfo: () => extraInfo,
            getCreatedOn: () => createdOn,
            getPublisherId: () => publisherId,
            getPicturesNames: () => picturesNames,
            getPicturesUrl: () => picturesUrl,
            getRentFlag: () => rentFlag
        });
    }
}