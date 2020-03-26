import { SafeUrl } from '@angular/platform-browser';

export class Property{
    _id:string; 
    title:string;
    address:string;
    price:string;
    rooms:Number;
    area:Number;
    type:Number; 
    tags:Array<String>;
    extraInfo:string;
    date = new Date();
    publisher:string;
    picturesNames: Array<string>;
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
        this.picturesURL = new Array<SafeUrl>(); 
    }
}