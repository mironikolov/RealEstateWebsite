export class GoogleMapsModel{
    results: [{
        address_components:[Object];
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