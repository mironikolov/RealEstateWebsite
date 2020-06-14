import express from 'express';
import userController, { getUser, postLoginUser, postUser, logoutUser, putUser, postPasswordReset, putPasswordReset } from './controllers/user-controller'
import { getByPublisherId, putProperty, postFindProperty, getByIdProperty, putUpdateProperty, deleteProperty } from './controllers/property-controller';
import { getPicture } from './controllers/pictures-controller';
import { postRating, putRating, getAverageRating, getUserRating, getTopRated } from './controllers/rating-controller';
import middlewares from './controllers/middlewares';
import googleApiController from './controllers/googleApi';
import getCities from './controllers/geoDbApi/get-cities';
import path from 'path';
import https from 'https';
import helmet from 'helmet';
import csp from 'helmet-csp';

const port = process.env.PORT || 3000;
var app = express();
app.use(helmet.frameguard());
app.use(csp({
    directives: {
        imgSrc: [`'self'`, `cloudinary.com`]
    }
}));

middlewares.accessControl( app );
middlewares.bodyParser( app );
middlewares.session( app );
(global as any).__basedir = __dirname;

app.use( express.static( path.join(__dirname, './static') ) );

app.post( '/api/users', postUser );
app.post( '/api/users/login', postLoginUser );
app.post( '/api/users/logout', middlewares.authUser, logoutUser() );
app.get( '/api/users/:_id', getUser );
app.get( '/api/users/topRated/:limit', getTopRated );
app.put( '/api/users/update', middlewares.authUser, putUser);
app.post( '/api/users/resetPassword', ( req, res ) => postPasswordReset( req, res ) );
app.put( '/api/users/resetPassword', ( req, res ) => putPasswordReset( req, res ) );

app.get( '/api/properties/publisherId/:publisherId', getByPublisherId );
app.get( '/api/properties/Id/:propertyId', getByIdProperty );
app.put( '/api/properties', middlewares.authUser, putProperty );
app.put( '/api/properties/update', middlewares.authUser, putUpdateProperty );
app.post( '/api/properties/delete', middlewares.authUser, ( deleteProperty ) );
app.post( '/api/properties/find', postFindProperty );

app.get( '/api/pictures/:folderId/:pictureName', ( req, res ) => getPicture( req, res ) );

app.post( '/api/rating/insert', middlewares.authUser, ( req, res ) => postRating( req, res ) );
app.put( '/api/rating/update', middlewares.authUser, ( req, res ) => putRating( req, res ) );
app.get( '/api/rating/averageRating/:userId', ( req, res ) => getAverageRating( req, res ) );
app.get( '/api/rating/userRating/:ratedUserId', ( req, res ) => getUserRating( req, res ) );

app.get( '/api/googleApi/:address', ( req, res ) => googleApiController.getCoordinates( req, res ) );
app.get( '/api/googleApi/:lat/:lng', ( req, res ) => googleApiController.getPlace( req, res ) );

app.get( '/api/citiesApi', getCities );

app.get( '*', ( req, res ) => { return res.sendFile( path.join( __dirname, './static/index.html' ) )})

app.listen(port, () => console.log( `Listening on port: ${port}` ));
//https.createServer(app).listen(3000);