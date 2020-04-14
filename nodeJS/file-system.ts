import { promises as fs } from 'fs';

export default Object.freeze({
    addPicturesToProperty,
    deletePictures,
    editPictures
});

async function addPicturesToProperty( propertyId: string ){
    await fs.rename(  `${__dirname}/Images/temp`, `${__dirname}/Images/${propertyId}` ).catch( (err) => {
        throw Error(err);
    });
    
    await fs.mkdir( `${__dirname}/Images/temp`).catch( (err) => {
        throw Error(err);
    });

  }

async function deletePictures( propertyId: string ){
    await fs.rmdir( `${__dirname}/Images/${propertyId}`, { recursive: true }).catch( (err) => {
        throw Error(err);
    });
}

async function editPictures ( propertyId: string ){
    try {
        await deletePictures( propertyId );
        await addPicturesToProperty( propertyId );
    } catch (error) {
        console.log(error);
        
    }
}