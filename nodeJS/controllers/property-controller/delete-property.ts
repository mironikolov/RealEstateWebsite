import { Request, Response } from 'express';
import env from '../../env/environment';
import cloudinaryConfig from '../../cloudinary-config';
import cloudinary from 'cloudinary';

export default function makeDeleteProperty( deletePropertyCase:any, findPropertyById:any ){
    return async function deleteProperty( httpRequest: Request, httpResponse: Response ) {
        try {
            const propertyId  = httpRequest.body.propertyID;
            
            const property = await findPropertyById(propertyId);
            if (httpRequest.session?.user._id != property.publisherId && !httpRequest.session?.user.adminFlag ) {
                return httpResponse.status(403).send({ error:'You don\'t have permission to do that' }).end();
            }

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