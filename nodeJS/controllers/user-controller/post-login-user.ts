import errorResponse from '../error-response';
import { Request } from 'express';
import bcrypt from 'bcrypt';

export default function makePostLoginUser({ loginUser }: { loginUser: any }) {
    return async function postLoginUser( httpRequest: Request ) {
        try {
            const userInfo = httpRequest.body;
            const result = await loginUser({ ...userInfo });
            if( await bcrypt.compare( userInfo.password, result.password ) && httpRequest.session ){
                httpRequest.session.user = result
                return{
                    headers: {
                        'Content-Type': 'application/json',
                        'Last-Modified': new Date( result?.modifiedOn ).toUTCString()
                    },
                    statusCode: 201,
                    body: result
                }
            } else {
                throw Error("Invalid login");
            }
            
        } catch (error) {
            return errorResponse( error );
        }
    }
}