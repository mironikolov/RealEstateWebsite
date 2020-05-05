import { Request, Response } from 'express';
import request from 'request';
import env from '../../env/environment';

export default ( req: Request, res: Response ) => {
    var options = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
        qs: { countryIds: 'BG',
        minPopulation: '50000',
        sort: '-population',
        types: 'CITY',
        limit: '10' },
        headers: {
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
          'x-rapidapi-key': env.GEO_DB_API_KEY
        }
      };
      
      request(options, function (error, response, body) {
          if (error) throw new Error(error);

          res.send( JSON.parse( body ) );
      });
}