import { SafeUrl } from '@angular/platform-browser';

export class Property{
    id:String; 
    title:String;
    address:String;
    price:String;
    rooms:Number;
    area:Number;
    type:Number; 
    tags:[String];
    extraInfo:String;
    date = new Date();
    publisher:String;
    pictureURL: SafeUrl;

    Property(){
        this.id = "null";
        this.title = "null";
        this.address = "null";
        this.price = "null";
        this.area = 0;
        this.type = 0;
        this.tags = ["null"];
        this.rooms = 0;
        this.extraInfo = "null"
        this.publisher="null";
    }
}