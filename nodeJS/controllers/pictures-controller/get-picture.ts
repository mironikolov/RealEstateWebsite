import errorResponse from '../error-response';
import { Request, Response } from 'express';
import fs from 'fs';
import env from '../../env/environment';

export default function makeGetPicture(){
    return async function getPicture( httpRequest: Request, httpResponse: Response ) {
        try {
            const folderId  = httpRequest.params.folderId;
            const pictureName = httpRequest.params.pictureName;
            
            fs.readdir( `${env.ROOT_DIR}/Images/${folderId}`, ( err, filenames ) => {
              if( err ){
                httpResponse.sendFile( env.ROOT_DIR + '/Images/defaultImages/1.jpg' );                
                return;
              }
              if ( filenames == null || filenames == undefined || filenames.length == 0 ) {
                httpResponse.sendFile( env.ROOT_DIR + '/Images/defaultImages/1.jpg' );
                return;
              }
              
              if ( pictureName == undefined || pictureName == 'undefined' ) {
                httpResponse.sendFile( env.ROOT_DIR + '/Images/'+ folderId + '/' + filenames[0], ( err ) => {
                  //httpResponse.sendFile( env.ROOT_DIR + '/Images/defaultImages/1.jpg' );
                } );
              }
              
              httpResponse.sendFile( env.ROOT_DIR + '/Images/'+ folderId + '/' + pictureName, ( err ) => {
                //httpResponse.sendFile( env.ROOT_DIR + '/Images/defaultImages/1.jpg' );
              } );
            });
          } catch (error) {            
            httpResponse.send( errorResponse(error).body );
        }
    }
}