import express from 'express';
import { getUser, postLoginUser, postUser, middlewares } from './controllers/user-controller'
import { getByPublisherId, putProperty, getByRentFlagProperty, getByIdProperty, putUpdateProperty } from './controllers/property-controller';
import makeCallback from './express-callback';

const port = 3000 || process.env.port;
var app = express();
middlewares.accessControl( app );
middlewares.bodyParser( app );
middlewares.multer;

app.post( '/users', makeCallback( postUser ) );
app.post( '/users/login', makeCallback( postLoginUser ) );
app.get( '/users/:_id', makeCallback( getUser ) );

app.get( '/properties/publisherId/:publisherId', makeCallback( getByPublisherId ) );
app.put( '/properties', makeCallback( putProperty ) );
app.get( '/properties/rentFlag/:rentFlag', makeCallback( getByRentFlagProperty ) );
app.get( '/properties/Id/:propertyId', makeCallback( getByIdProperty ) );
app.put( '/properties/update', makeCallback( putUpdateProperty ) );

app.listen(port, () => console.log( `Listening on port: ${port}` ));