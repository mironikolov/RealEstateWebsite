import errorResponse from '../error-response';
import { Request, Response } from 'express';
import Multer from '../middlewares/userMulter';
import cloudinaryConfig from '../../cloudinary-config';
import cloudinary from 'cloudinary';
import datauriParser from 'datauri/parser';
import env from '../../env/environment';

export default function makeUpdateProperty({ updateProperty }: { updateProperty: any }){
    const multer = Multer.array('pic');

    return async function updataProperty( httpRequest: Request, httpResponse: Response ) {
        multer( httpRequest, httpResponse, async (err: any) => {
            if (err) {
                return httpResponse.status(500).send({ 'Multer error': err }).end();
            }
            try {
                const {...propertyInfo }  = JSON.parse( httpRequest.body.data );
            
                const property = await updateProperty( propertyInfo );
                
                if (httpRequest.files) {
                    cloudinaryConfig();
                    const parser = new datauriParser();
                    const picArr = httpRequest.files as Express.Multer.File[];
                    picArr.forEach(file => {
                        
                        const content = parser.format( file.mimetype, file.buffer ).content || '';
                        if ( content == '' ) {
                            return httpResponse.status(500).send({ error:'Picture error' }).end();
                        }
                        cloudinary.v2.api.delete_resources_by_prefix( `${ env.CLOUDINARY_FOLDER }/${ propertyInfo._id }`, res => {
                            //console.log(res);
                        } );

                        cloudinary.v2.uploader.upload( content,
                            { folder: `${env.CLOUDINARY_FOLDER}/${ propertyInfo._id }/`, public_id: file.originalname },
                            ( error: any, result: any ) => {
                            if (error) {
                                console.log(error);
                                throw Error;                  
                            }
                            //console.log(result);
                        });
                    });
                    
                }
                
                return httpResponse.status(200).send( property ).end();
            } catch (error) {
                return httpResponse.status(500).send({ Error: error }).end();
            }
        });
    }
}