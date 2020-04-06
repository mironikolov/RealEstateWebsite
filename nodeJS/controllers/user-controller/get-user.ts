import errorResponse from '../error-response';

export default function makeGetUser({ findByIdUser }: { findByIdUser: any }){
    return async function getUser( httpRequest: any ) {
        try {
            const { ...userInfo } = httpRequest;
            const user = await findByIdUser({ ...userInfo });
            
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date( user?.modifiedOn ).toUTCString()
                },
                statusCode: 201,
                body: { user }
            }
        } catch (error) {            
            return errorResponse( error );
        }
    }
}