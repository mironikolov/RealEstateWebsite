export class User{
    id: string; 
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    createdOn: Date;

    User(){
        this.id="null";
        this.username="null";
        this.password="null";
        this.email="null";
        this.phoneNumber="null";
        this.createdOn = null;
    }
}