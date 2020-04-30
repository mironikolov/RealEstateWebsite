import { findAllByPublisherIdProperty, findProperties,
    findOneByIdProperty, insertProperty, updateProperty, deletePropertyCase } from '../../use-cases/property-use-cases';
import makeGetByPublisherId from './get-by-PublisherId';
import makePutProperty from './put-Property';
import makePostFindProperty from './post-find';
import makeGetByIdProperty from './get-by-Id-Property';
import makeUpdateProperty from './update-Property';
import makeDeleteProperty from './delete-property';

const getByPublisherId = makeGetByPublisherId({ findAllByPublisherIdProperty });
const putProperty = makePutProperty({ insertProperty });
const postFindProperty = makePostFindProperty({ findProperties });
const getByIdProperty = makeGetByIdProperty({ findOneByIdProperty });
const putUpdateProperty = makeUpdateProperty({ updateProperty });
const deleteProperty = makeDeleteProperty({ deletePropertyCase });

const propertyController = Object.freeze({
    getByPublisherId,
    putProperty,
    postFindProperty,
    getByIdProperty,
    putUpdateProperty,
    deleteProperty
});

export default propertyController;
export { getByPublisherId, putProperty, postFindProperty, getByIdProperty, putUpdateProperty, deleteProperty };