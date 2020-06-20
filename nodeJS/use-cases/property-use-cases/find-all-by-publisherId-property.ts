export default function makeFindAllPublisherIdProperty( propertiesDb: any ){
    return async function findAllByPublisherIdProperty( publisherId: string ){
        return propertiesDb.findAllByPublisherId( publisherId );
    }
}