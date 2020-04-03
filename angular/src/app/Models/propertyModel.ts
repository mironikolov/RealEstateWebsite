import { SafeUrl } from '@angular/platform-browser';
import { Deserializable } from './deserializableModel';

export class Property implements Deserializable{
    _id:string; 
    title:string = null;
    address:string = null;
    price:string = null;
    rooms:Number = null;
    area:Number = null;
    type:Number = null; 
    tags:Array<String> = null;
    extraInfo:string = null;
    date:Date = new Date();
    publisher:string = null;
    picturesNames: Array<string> = new Array<string>();
    picturesURL: Array<SafeUrl> = new Array<SafeUrl>();
    
    deserialize( input:any ){
        Object.assign( this, input );
        return this;
    }
}