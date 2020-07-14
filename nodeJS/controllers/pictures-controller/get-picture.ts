import errorResponse from '../error-response';
import { Request, Response } from 'express';
import env from '../../env/environment';
import cloudinaryConfig from '../../cloudinary-config';
import cloudinary from 'cloudinary';
import http from 'http';

export default function makeGetPicture(){
  return async function getPicture( httpRequest: Request, httpResponse: Response ) {
    try {
      const folderId  = httpRequest.params.folderId;
      const pictureName = httpRequest.params.pictureName;
      cloudinaryConfig();
      
      
      if ( folderId != 'undefined' && pictureName != 'undefined' ) {
        cloudinary.v2.search.expression( `${env.CLOUDINARY_FOLDER}/${folderId}/${pictureName}` ).execute().then( result => {
          if ( !result.resources ) {
            throw Error();
          }
          
          let pic = (result.resources as [any]).find( res => {
            return res.filename == pictureName
          } );

          if (pic === undefined) {
            throw Error();
          }
          http.request( pic.url, res => {
            let data = Array<any>();
            
            res.on('data', chunk => {
              data.push( chunk );
            });
            
            res.on('end', () => {
              let buffer = Buffer.concat(data);
              httpResponse.status(200).send( buffer ).end();
            });
          }).end();
        });
        return;
      }
      
      if ( pictureName === 'undefined' ) {
        cloudinary.v2.search.expression( `${env.CLOUDINARY_FOLDER}/${folderId}` ).execute().then( result => {          
          if ( !result.resources ) {
            throw Error();
          }

          http.request( result.resources[0].url, res => {
            let data = Array<any>();
            
            res.on('data', chunk => {
              data.push( chunk );
            });
            
            res.on('end', () => {
              let buffer = Buffer.concat(data);
              httpResponse.status(200).send( buffer ).end();
            });
          }).end();
        });
        return;
      }
      
      cloudinary.v2.search.expression( `${env.CLOUDINARY_FOLDER}/DefaultImage` ).execute().then( result => {
        
        if ( !result.resources ) {
          throw Error();
        }
        
        http.request( result.resources[0].url, res => {
          let data = Array<any>();
          
          res.on('data', chunk => {
            data.push( chunk );
          });
          
          res.on('end', () => {
            let buffer = Buffer.concat(data);
            httpResponse.status(200).send( buffer ).end();
          });
        }).end();
      });
      return;

    } catch (error) {            
      
      return httpResponse.status(404).send({ Error: error.message }).end();
    }
  }
}