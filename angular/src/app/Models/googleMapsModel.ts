export class GoogleMapsModel{
    results: [{
        address_components:[{short_name: string}, {short_name: string}, {short_name: string}];
        formattet_address: string;
        geometry:{
            location:{
                lat:number;
                lng:number;
            }
        }
    }];
    status: string;
}