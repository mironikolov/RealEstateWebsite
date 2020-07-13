import { Request, Response } from 'express';
import Multer from '../middlewares/userMulter';
import cloudinaryConfig from '../../cloudinary-config';
import cloudinary from 'cloudinary';
import datauriParser from 'datauri/parser';
import env from '../../env/environment';
import cuid from 'cuid';

export default function makeUpdateProperty({ updateProperty }: { updateProperty: any }){
    const multer = Multer.array('pic');

    return async function updataProperty( httpRequest: Request, httpResponse: Response ) {
        multer( httpRequest, httpResponse, async (err: any) => {
            if (err) {
                return httpResponse.status(500).send({ 'Multer error': err }).end();
            }
            try {
                const {...propertyInfo }  = JSON.parse( httpRequest.body.data );
                propertyInfo.picturesNames = Array<string>();

                if (httpRequest.files) {
                    const picArr = httpRequest.files as Express.Multer.File[];
                    picArr.forEach(file => {
                        cloudinaryConfig();
                        const parser = new datauriParser();
                        
                        file.originalname = cuid();
                        (propertyInfo.picturesNames as string[]).push(file.originalname);
                        
                        const content = parser.format( file.mimetype, file.buffer ).content || '';
                        if ( content == '' ) {
                            return httpResponse.status(500).send({ error:'Picture error' }).end();
                        }
                        cloudinary.v2.api.delete_resources_by_prefix( `${ env.CLOUDINARY_FOLDER }/${ propertyInfo._id }`, res => {
                            console.log(res);
                        } );
                        
                        cloudinary.v2.uploader.upload( content,
                            { folder: `${env.CLOUDINARY_FOLDER}/${ propertyInfo._id }/`, public_id: file.originalname, transformation: { quality: "60", fetch_format: "auto"} },
                            ( error: any, result: any ) => {
                                if (error) {
                                console.log(error);
                                throw Error;                  
                            }
                        });
                    });
                    
                }

                const property = await updateProperty( propertyInfo );
                
                return httpResponse.status(200).send( property ).end();
            } catch (error) {
                return httpResponse.status(500).send({ Error: error }).end();
            }
        });
    }
}