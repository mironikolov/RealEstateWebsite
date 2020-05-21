import errorResponse from '../error-response';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import fileSystem from '../../file-system';
import cloudinaryConfig from '../../cloudinary-config';
import cloudinary from 'cloudinary';
import Multer from '../middlewares/userMulter';
import datauriParser from 'datauri/parser';

export default function makePutUser({ updateUser }: { updateUser: any }){
    const multer = Multer.single('pic');

    return async function putUser( httpRequest: Request, httpResponse: Response ) { 
        multer( httpRequest, httpResponse, async (err: any) => {
            if (err) {
                httpResponse.status(500).send({ 'Multer error': err });
            }
            try {
                const userInfo = JSON.parse( httpRequest.body.data );

                const posted = await updateUser({ _id: httpRequest.session?.user._id,
                password: httpRequest.session?.user.password,
                ...userInfo });

                if (httpRequest.file) {
                    cloudinaryConfig();
                    const parser = new datauriParser();
                    const content = parser.format( httpRequest.file.mimetype, httpRequest.file.buffer ).content || '';
                    if ( content == '' ) {
                        httpResponse.status(500).send({ error:'Picture error' });
                    }
                    cloudinary.v2.uploader.upload( content,
                    { folder: `imotikarq/${httpRequest.session?.user._id}/`, public_id: httpRequest.session?.user._id},
                    ( error: any, result: any ) => {
                        if (error) {
                            httpResponse.status(500).send({'Picture upload error': error});                 
                        }
                        //console.log(result);
                    });    
                }

                httpResponse.status(200).send( posted );
            } catch (error) {
                httpResponse.status(500).send({ Error: error });
            }
        });
    }
}