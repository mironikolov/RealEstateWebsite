import { SafeUrl } from '@angular/platform-browser';

export class Property{
    _id:String; 
    title:String;
    address:String;
    price:String;
    rooms:Number;
    area:Number;
    type:Number; 
    tags:Array<String>;
    extraInfo:String;
    date = new Date();
    publisher:String;
    picturesURL: Array<SafeUrl>;

    Property(){
        this._id = "null";
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