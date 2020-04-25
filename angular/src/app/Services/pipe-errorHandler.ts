import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export default function createHandlePipeError ( ){
    return function handlePipeError ( error: HttpErrorResponse ){
        //client side error
        if ( error.error instanceof ErrorEvent ) {
            alert( "The request to server failed" );
            console.log( error.error.message );
            return throwError( "The request to server failed" );
        }
    
        if ( error.status == 404 ) {
            return throwError( "not found" );
        }
    
        return throwError( `${error}` );
    }
}