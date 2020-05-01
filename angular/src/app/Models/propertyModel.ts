import { SafeUrl } from '@angular/platform-browser';
import { Deserializable } from './deserializableModel';

export class Property implements Deserializable{
    _id:string; 
    title:string = null;
    address:string = null;
    city:string = null;
    district: string = null;
    price:Number = null;
    rooms:Number = null;
    area:Number = null;
    type:Number = null; 
    tags:Array<String> = null;
    extraInfo:string = null;
    date:Date = new Date();
    publisherId:string = null;
    picturesNames: Array<string> = new Array<string>();
    picturesURL: Array<SafeUrl> = new Array<SafeUrl>();
    rentFlag: boolean;
    createdOn: string = null;
    
    deserialize( input:any ){
        Object.assign( this, input );
        return this;
    }
}