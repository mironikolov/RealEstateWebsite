import errorResponse from '../error-response';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import fileSystem from '../../file-system';
import Multer from '../middlewares/userMulter';
import cloudinaryConfig from '../../cloudinary-config';
import cloudinary from 'cloudinary';
import datauriParser from 'datauri/parser';

export default function makePostUser({ addUser }: { addUser: any }){
    const multer = Multer.single('pic');
    
    return async function postUser( httpRequest: Request, httpResponse: Response ) {
        
        multer( httpRequest, httpResponse, async (err: any) => {
            if (err) {
                httpResponse.status(500).send({ 'Multer error': err });
            }
            try {
                const userInfo = JSON.parse( httpRequest.body.data );
                const hashedPassword = await bcrypt.hash( userInfo.password, 10 );
                userInfo.password = hashedPassword;
                
                const posted = await addUser({ ...userInfo });
        
                console.log(httpRequest.file);
    
                if (httpRequest.file) {
                    cloudinaryConfig();
                    const parser = new datauriParser();
                    const content = parser.format( httpRequest.file.mimetype, httpRequest.file.buffer ).content || '';
                    if ( content == '' ) {
                        httpResponse.status(500).send({ error:'Picture error' });
                    }
                    
                    cloudinary.v2.uploader.upload( content,
                        { folder: `imotikarq/${ posted.insertedId }/`, public_id: posted.insertedId },
                        ( error: any, result: any ) => {
                        if (error) {
                            console.log(error);
                            httpResponse.status(500).send({'Picture upload error': error});                  
                        }
                        console.log(result);
                    });
                }
                
                httpResponse.status(201).send( posted );
            } catch (error) {
                httpResponse.status(500).send({ Error: error });
            }
        });
    }
}