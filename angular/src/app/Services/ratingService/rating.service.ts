import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Rating from 'src/app/Models/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  ratingUrl:string = 'http://localhost:3000/rating';

  constructor( private http:HttpClient ) { }

  getAverageRating( userId: string ):Observable<Rating>{
    return this.http.get<Rating>( `${this.ratingUrl}/averageRating/${userId}`);
  }

  getUserRating( userId: string ):Observable<{ rating: number }>{
    return this.http.get<{ rating: number }>( `${this.ratingUrl}/userRating/${ userId }`, { withCredentials: true });
  }

  insertRating( userToRate: string, Rating: number ): Observable<any>{
    return this.http.post( `${this.ratingUrl}/insert`, { userToRateId: userToRate, rating: Rating }, { withCredentials: true });
  }
}
