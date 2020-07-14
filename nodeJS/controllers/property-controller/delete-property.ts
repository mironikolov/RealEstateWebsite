import { Request, Response } from 'express';
import env from '../../env/environment';
import cloudinaryConfig from '../../cloudinary-config';
import cloudinary from 'cloudinary';

export default function makeDeleteProperty({ deletePropertyCase }: { deletePropertyCase: any }){
    return async function deleteProperty( httpRequest: Request, httpResponse: Response ) {
        try {
            const propertyId  = httpRequest.body.propertyID;
            
            const result = await deletePropertyCase( propertyId );

            cloudinaryConfig();
            cloudinary.v2.api.delete_resources_by_prefix( `${ env.CLOUDINARY_FOLDER }/${ propertyId }`, res => {
            } );
            //todo delete folder

            return httpResponse.status(200).send( result ).end();
        } catch (error) {            
            return httpResponse.status(500).send({ Error: error }).end();
        }
    }
}