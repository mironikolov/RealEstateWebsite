import errorResponse from '../error-response';
import { Request, Response } from 'express';
import fs from 'fs';
import env from '../../env/environment';

export default function makeGetPicture(){
    return async function getPicture( httpRequest: Request, httpResponse: Response ) {
        try {
            const propertyId  = httpRequest.params.propertyId;
            const pictureName = httpRequest.params.pictureName;
            
            fs.readdir( `${env.ROOT_DIR}/Images/${propertyId}`, ( err, filenames ) => {
                if( err ){
                  httpResponse.sendFile( env.ROOT_DIR + '/Images/defaultImages/1.jpg' );
                  return;
                }
                if ( filenames == null || pictureName == "undefined") {
                  httpResponse.sendFile( env.ROOT_DIR + '/Images/defaultImages/1.jpg' );
                  return;
                }

                httpResponse.sendFile( env.ROOT_DIR + '/Images/'+ propertyId + '/' + pictureName, ( err ) => {
                  //httpResponse.sendFile( env.ROOT_DIR + '/Images/defaultImages/1.jpg' );
                } );
              });
        } catch (error) {            
            httpResponse.send( errorResponse(error).body );
        }
    }
}