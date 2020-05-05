import { Request, Response } from 'express';
import https from 'https';
import env from '../../env/environment';

export default ( req: Request, res: Response ) => {
    const address = req.params.address;
    
    https.get( `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${env.GOOGLE_API_KEY}`, ( resp => {
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