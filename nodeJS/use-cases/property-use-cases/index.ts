import makeFindAllByPublisherIdProperty from './find-all-by-publisherId-property';
import makeFindProperties  from './find-properties';
import makeFindOneByIdProperty from './find-one-by-Id-property';
import makeInsertProperty from './insert-property';
import makeUpdateProperty from './update-property';
import makeDeleteProperty from './delete-property';
import dataAccess from '../../data-access';

const propertiesDb = dataAccess.propertiesDb;
const findAllByPublisherIdProperty = makeFindAllByPublisherIdProperty({ propertiesDb });
const findProperties = makeFindProperties({ propertiesDb });
const findOneByIdProperty = makeFindOneByIdProperty({ propertiesDb });
const insertProperty = makeInsertProperty({ propertiesDb });
const updateProperty = makeUpdateProperty({ propertiesDb });
const deletePropertyCase = makeDeleteProperty({ propertiesDb });

const propertyService = Object.freeze({
    findAllByPublisherIdProperty,
    findProperties,
    findOneByIdProperty,
    insertProperty,
    updateProperty,
    deletePropertyCase
});

export default propertyService;
export { findAllByPublisherIdProperty, findProperties, findOneByIdProperty, insertProperty, updateProperty, deletePropertyCase };