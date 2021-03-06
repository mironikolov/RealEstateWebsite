import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Multer from '../middlewares/userMulter';
import cloudinaryConfig from '../../cloudinary-config';
import cloudinary from 'cloudinary';
import datauriParser from 'datauri/parser';

export default function makePostUser({ addUser }: { addUser: any }){
    const multer = Multer.single('pic');
    
    return async function postUser( httpRequest: Request, httpResponse: Response ) {
        
        multer( httpRequest, httpResponse, async (err: any) => {
            if (err) {
                return httpResponse.status(500).send({ 'Multer error': err }).end();
            }
            try {
                const userInfo = JSON.parse( httpRequest.body.data );
                //Хеширане на паролата
                const hashedPassword = await bcrypt.hash( userInfo.password, 10 );
                userInfo.password = hashedPassword;
                
                //Добавяна на потребител
                const posted = await addUser({ ...userInfo });
                
                //Ако има файл се качва на сървъра на Cloudinary
                if (httpRequest.file) {
                    cloudinaryConfig();
                    const parser = new datauriParser();
                    const content = parser.format( httpRequest.file.mimetype, httpRequest.file.buffer ).content || '';
                    if ( content == '' ) {
                        return httpResponse.status(500).send({ error:'Picture error' }).end();
                    }
                    
                    cloudinary.v2.uploader.upload( content,
                        { folder: `imotikarq/${ posted.insertedId }/`, public_id: posted.insertedId, transformation: { quality: "70", fetch_format: "auto" } })
                        .catch( error => httpResponse.status(500).send({ Error: error.message }).end() );
                }
                
                return httpResponse.status(201).send( posted ).end();
            } catch (error) {
                return httpResponse.status(500).send({ Error: error.message }).end();
            }
        });
    }
}