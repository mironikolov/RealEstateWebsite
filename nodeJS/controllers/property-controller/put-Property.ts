import { Request, Response } from 'express';
import Multer from '../middlewares/userMulter';
import cloudinaryConfig from '../../cloudinary-config';
import cloudinary from 'cloudinary';
import datauriParser from 'datauri/parser';
import env from '../../env/environment';
import cuid from 'cuid';

export default function makePutProperty({ insertProperty }: { insertProperty: any }){
    const multer = Multer.array('pic');

    return async function putProperty( httpRequest: Request, httpResponse: Response ) {
        multer( httpRequest, httpResponse, async (err: any) => {
            if (err) {
                return httpResponse.status(500).send({ 'Multer error': err }).end();
            }
            try {
                const {...propertyInfo }  = JSON.parse( httpRequest.body.data );
                propertyInfo.createdOn = Date.now();
                (propertyInfo.picturesNames as string[]).forEach( (name, index) => {
                    propertyInfo.picturesNames[index] = cuid();
                });

                const property = await insertProperty( propertyInfo );

                if (httpRequest.files) {
                    cloudinaryConfig();
                    const parser = new datauriParser();
                    const picArr = httpRequest.files as Express.Multer.File[];

                    let index: number = 0;
                    picArr.forEach(file => {
                        
                        file.originalname = (propertyInfo.picturesNames as string[])[index];
                        index++;

                        const content = parser.format( file.mimetype, file.buffer ).content || '';
                        if ( content == '' ) {
                            return httpResponse.status(500).send({ error:'Picture error' }).end();
                        }
                        
                        cloudinary.v2.uploader.upload( content,
                            { folder: `${env.CLOUDINARY_FOLDER}/${ property.ops[0]._id }/`, public_id: file.originalname, transformation: { quality: "60", fetch_format: "auto" } })
                            .catch( error => {
                                return httpResponse.status(500).send({Error: error.message}).end();
                            });
                    
                    });
                    
                }

                
                return httpResponse.status(201).send( property ).end();
            } catch (error) {
                return httpResponse.status(500).send({Error: error.message}).end();
            }
        });
    }
}