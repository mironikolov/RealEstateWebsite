import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Rating from 'src/app/Models/rating';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import sessionErrorHandler from '../session-errorHandler';
import { LogInService } from '../logInService/log-in.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  public ratingUrl:string = `${environment.SERVER_URL}/rating`;

  constructor( private http:HttpClient, private logInService: LogInService ) { }

  getAverageRating( userId: string ):Observable<Rating>{
    return this.http.get<Rating>( `${this.ratingUrl}/averageRating/${userId}`);
  }

  getUserRating( userId: string ):Observable<{ rating: number }>{
    return this.http.get<{ rating: number }>( `${this.ratingUrl}/userRating/${ userId }`, { withCredentials: true });
  }

  insertRating( userToRate: string, Rating: number ): Observable<any>{
    return this.http.post( `${this.ratingUrl}/insert`, { userToRateId: userToRate, rating: Rating }, { withCredentials: true })
    .pipe( catchError( sessionErrorHandler( this.logInService )) );
  }
}
