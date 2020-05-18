import errorResponse from '../error-response';
import { Request } from 'express';
import bcrypt from 'bcrypt';
import fileSystem from '../../file-system';
import cloudinaryConfig from '../../cloudinary-config';
import cloudinary from 'cloudinary';

export default function makePutUser({ updateUser }: { updateUser: any }){
    return async function putUser( httpRequest: Request ) {
        
      try {
          console.log("tuka", httpRequest.body.data, httpRequest.file);
          const userInfo = JSON.parse( httpRequest.body.data );
          //const hashedPassword = await bcrypt.hash( userInfo.password, 10 );
          //userInfo.password = hashedPassword;
          
          const posted = await updateUser({ _id: httpRequest.session?.user._id,
            password: httpRequest.session?.user.password,
            ...userInfo });
          
            
            // cloudinaryConfig();
            // cloudinary.v2.uploader.upload( `${env.ROOT_DIR}\\Images\\${id}`, {}, ( error: any, result: any ) => {
            //     if (error) {
            //         console.log(error);                    
            //     }
            //     console.log(result);
            // });

          return {
              headers: {
                  'Content-Type': 'application/json',
                  'Last-Modified': new Date( posted.modifiedOn ).toUTCString()
              },
              statusCode: 201,
              body: { posted }
          }
      } catch ( error ) {
          
          return errorResponse( error );
      }  
    }
}