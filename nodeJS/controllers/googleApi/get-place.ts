import { Request, Response } from 'express';
import http from 'http';
import env from '../../env/environment';

export default ( req: Request, res: Response ) => {
    const lat = req.params.lat;
    const lng = req.params.lng;

    http.get( `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${env.GOOGLE_API_KEY}`, ( resp => {
        let data = '';

        resp.on( 'data', chunk => {
            data += chunk;
        });

        resp.on( 'end', () => {
            res.status( 201 ).send( data );
        });
    })).on( 'error', err => {
        res.status( 500 ).send( { message: err.message } );
    });
}