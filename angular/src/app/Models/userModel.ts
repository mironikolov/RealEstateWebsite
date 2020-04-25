import Rating from './rating';
import { SafeUrl } from '@angular/platform-browser';

export class User {
    _id: string; 
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    createdOn: Date;
    ratings: Array<Rating>;
    adminFlag: boolean;
    picture: SafeUrl;

    User(){
        this._id="null";
        this.username="null";
        this.password="null";
        this.email="null";
        this.phoneNumber="null";
        this.createdOn = null;
        this.ratings = null;
        this.adminFlag = false;
        this.picture = null;
    }
}