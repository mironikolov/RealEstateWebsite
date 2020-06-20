import { Request, Response } from 'express';
import Multer from '../middlewares/userMulter';
import cloudinaryConfig from '../../cloudinary-config';
import cloudinary from 'cloudinary';
import datauriParser from 'datauri/parser';
import env from '../../env/environment';

export default function makePutProperty({ insertProperty }: { insertProperty: any }){
    const multer = Multer.array('pic');

    return async function putProperty( httpRequest: Request, httpResponse: Response ) {
        multer( httpRequest, httpResponse, async (err: any) => {
            if (err) {
                return httpResponse.status(500).send({ 'Multer error': err }).end();
            }
            try {
                const {...propertyInfo }  = JSON.parse( httpRequest.body.data );
            
                const property = await insertProperty( propertyInfo );
    
                if (httpRequest.files) {
                    cloudinaryConfig();
                    const parser = new datauriParser();
                    const picArr = httpRequest.files as Express.Multer.File[];
                    picArr.forEach(file => {
                        
                        const content = parser.format( file.mimetype, file.buffer ).content || '';
                        if ( content == '' ) {
                            return httpResponse.status(500).send({ error:'Picture error' }).end();
                        }

                        cloudinary.v2.uploader.upload( content,
                            { folder: `${env.CLOUDINARY_FOLDER}/${ property.ops[0]._id }/`, public_id: file.originalname, transformation: { quality: "60", fetch_format: "auto" } },
                            ( error: any, result: any ) => {
                            if (error) {
                                throw Error;                  
                            }
                        });
                    });
                    
                }
                
                return httpResponse.status(201).send( property ).end();
            } catch (error) {
                return httpResponse.status(500).send({ Error: error }).end();
            }
        });
    }
}