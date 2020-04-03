import errorResponse from './errorResponse';

export default function makePostLoginUser({ loginUser }: { loginUser: any }) {
    return async function postLoginUser( httpRequest: Request ) {
        try {
            const { ...userInfo } = httpRequest.body;
            const result = await loginUser({ ...userInfo });
            
            return{
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date( result?.modifiedOn ).toUTCString()
                },
                statusCode: 201,
                body: result
            }
        } catch (error) {
            return errorResponse( error );
        }
    }
}