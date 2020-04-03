import errorResponse from './errorResponse';

export default function makePostUser({ addUser }: { addUser: any }){
    return async function postUser( httpRequest: Request ) {
      try {
          const { ...userInfo } = httpRequest.body;
          const posted = await addUser({ ...userInfo });
          
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