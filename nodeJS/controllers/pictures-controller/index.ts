import makeGetPicture from './get-picture';

const getPicture = makeGetPicture();

const picturesController = Object.freeze({
    getPicture
});

export default picturesController;
export { getPicture };