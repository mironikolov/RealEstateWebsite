import { HttpErrorResponse } from '@angular/common/http';
import { LogInService } from './logInService/log-in.service';
import { throwError } from 'rxjs';

export default function createHandleSessionError ( loginService:LogInService ){
    return function handleSessionError ( error: HttpErrorResponse ){
        //client side error
        if ( error.error instanceof ErrorEvent ) {
            alert( "The request to server failed" );
            console.log( error.error.message );
            return throwError( "The request to server failed" );
        }

        if ( error.status == 403 ) {
            alert( "Please log in" );
            return throwError( "Not logged-in" );
        }
    
        if ( error.status == 403 && loginService.isLoggedIn()) {
            alert( "Session expired" );
            loginService.logOff();
            return throwError( "Session expired" );
        }
    
        return throwError( ` ${error.message}` );
    }
}