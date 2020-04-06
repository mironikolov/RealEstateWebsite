export default function buildMakeProperty(){
    return function makeProperty({
        _id = '',
        title = '',
        address = '',
        price = 0,
        rooms = 0,
        type = '',
        tags = Array<string>(),
        extraInfo = '',
        createdOn = Date.now(),
        publisherId = '',
        picturesNames = Array<string>(),
        picturesUrl = Array<any>(),
        rentFlag = true
    } = {}) {

        return Object.freeze({
            getId: () => _id,
            getTitle: () => title,
            getAddress: () => address,
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