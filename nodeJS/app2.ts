import express from 'express';
import { getUser, postLoginUser, postUser, middlewares } from './controllers/user-controller'
import { getByPublisherId, putProperty, getByRentFlagProperty, getByIdProperty, putUpdateProperty, deleteProperty } from './controllers/property-controller';
import makeCallback from './express-callback';
import { getPicture } from './controllers/pictures-controller';

const port = 3000 || process.env.port;
var app = express();
middlewares.accessControl( app );
middlewares.bodyParser( app );
(global as any).__basedir = __dirname;

app.post( '/users', makeCallback( postUser ) );
app.post( '/users/login', makeCallback( postLoginUser ) );
app.get( '/users/:_id', makeCallback( getUser ) );

app.get( '/properties/publisherId/:publisherId', makeCallback( getByPublisherId ) );
app.get( '/properties/rentFlag/:rentFlag', makeCallback( getByRentFlagProperty ) );
app.get( '/properties/Id/:propertyId', makeCallback( getByIdProperty ) );
app.put( '/properties', middlewares.multer.any(), makeCallback( putProperty ) );
app.put( '/properties/update', middlewares.multer.any(), makeCallback( putUpdateProperty ) );
app.post( '/properties/delete', makeCallback( deleteProperty ) );

app.get( '/pictures/:propertyId/:pictureName', getPicture );

app.listen(port, () => console.log( `Listening on port: ${port}` ));