import express from 'express';
import userController, { getUser, postLoginUser, postUser, logoutUser, middlewares, putUser } from './controllers/user-controller'
import { getByPublisherId, putProperty, getByRentFlagProperty, getByIdProperty, putUpdateProperty, deleteProperty } from './controllers/property-controller';
import makeCallback from './express-callback';
import { getPicture } from './controllers/pictures-controller';
import { postRating, putRating, getAverageRating, getUserRating, getTopRated } from './controllers/rating-controller';

const port = 3000 || process.env.port;
var app = express();
middlewares.accessControl( app );
middlewares.bodyParser( app );
middlewares.session( app );
(global as any).__basedir = __dirname;

app.post( '/users', makeCallback( postUser ) );
app.post( '/users/login', makeCallback( postLoginUser ) );
app.post( '/users/logout', middlewares.authUser, logoutUser() );
app.get( '/users/:_id', makeCallback( getUser ) );
app.get( '/users/topRated/:limit', ( req, res ) => getTopRated( req, res ) );
app.put( '/users/update', middlewares.authUser, middlewares.userMulter.any(), makeCallback( putUser ) );

app.get( '/properties/publisherId/:publisherId', makeCallback( getByPublisherId ) );
app.get( '/properties/rentFlag/:rentFlag', middlewares.authUser, makeCallback( getByRentFlagProperty ) ); //authUser for test
app.get( '/properties/Id/:propertyId', makeCallback( getByIdProperty ) );
app.put( '/properties', middlewares.authUser, middlewares.propertyMulter.any(), makeCallback( putProperty ) );
app.put( '/properties/update', middlewares.authUser, middlewares.propertyMulter.any(), makeCallback( putUpdateProperty ) );
app.post( '/properties/delete', middlewares.authUser, makeCallback( deleteProperty ) );

app.get( '/pictures/:folderId/:pictureName', ( req, res ) => getPicture( req, res ) );

app.post( '/rating/insert', middlewares.authUser, ( req, res ) => postRating( req, res ) );
app.put( '/rating/update', middlewares.authUser, ( req, res ) => putRating( req, res ) );
app.get( '/rating/averageRating/:userId', ( req, res ) => getAverageRating( req, res ) );
app.get( '/rating/userRating/:ratedUserId', middlewares.authUser, ( req, res ) => getUserRating( req, res ) );

app.listen(port, () => console.log( `Listening on port: ${port}` ));