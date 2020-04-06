import { findAllByPublisherIdProperty, findAllByRentFlagProperty,
    findOneByIdProperty, insertProperty, updateProperty } from '../../use-cases/property-use-cases';
import makeGetByPublisherId from './get-by-PublisherId';
import makePutProperty from './put-Property';
import makeGetByRentFlagProperty from './get-by-rent-flag';
import makeGetByIdProperty from './get-by-Id-Property';
import makeUpdateProperty from './update-Property';

const getByPublisherId = makeGetByPublisherId({ findAllByPublisherIdProperty });
const putProperty = makePutProperty({ insertProperty });
const getByRentFlagProperty = makeGetByRentFlagProperty({ findAllByRentFlagProperty });
const getByIdProperty = makeGetByIdProperty({ findOneByIdProperty });
const putUpdateProperty = makeUpdateProperty({ updateProperty });

const propertyController = Object.freeze({
    getByPublisherId,
    putProperty,
    getByRentFlagProperty,
    getByIdProperty,
    putUpdateProperty
});

export default propertyController;
export { getByPublisherId, putProperty, getByRentFlagProperty, getByIdProperty, putUpdateProperty };