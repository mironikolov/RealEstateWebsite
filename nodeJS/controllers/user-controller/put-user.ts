import errorResponse from '../error-response';
import { Request } from 'express';
import bcrypt from 'bcrypt';
import fileSystem from '../../file-system';

export default function makePutUser({ updateUser }: { updateUser: any }){
    return async function putUser( httpRequest: Request ) {
        
      try {
          const userInfo = JSON.parse( httpRequest.body.data );
          //const hashedPassword = await bcrypt.hash( userInfo.password, 10 );
          //userInfo.password = hashedPassword;
            
          const posted = await updateUser({ _id: httpRequest.session?.user._id,
            password: httpRequest.session?.user.password,
            ...userInfo });
          
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