import makeFindAllByPublisherIdProperty from './find-all-by-publisherId-property';
import makeFindAllByRentFlagProperty from './find-all-by-rent-flag-property';
import makeFindOneByIdProperty from './find-one-by-Id-property';
import makeInsertProperty from './insert-property';
import makeUpdateProperty from './update-property';
import dataAccess from '../../data-access';

const propertiesDb = dataAccess.propertiesDb;
const findAllByPublisherIdProperty = makeFindAllByPublisherIdProperty({ propertiesDb });
const findAllByRentFlagProperty = makeFindAllByRentFlagProperty({ propertiesDb });
const findOneByIdProperty = makeFindOneByIdProperty({ propertiesDb });
const insertProperty = makeInsertProperty({ propertiesDb });
const updateProperty = makeUpdateProperty({ propertiesDb });

const propertyService = Object.freeze({
    findAllByPublisherIdProperty,
    findAllByRentFlagProperty,
    findOneByIdProperty,
    insertProperty,
    updateProperty
});

export default propertyService;
export { findAllByPublisherIdProperty, findAllByRentFlagProperty, findOneByIdProperty, insertProperty, updateProperty };