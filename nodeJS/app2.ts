import express from 'express';
import { getUser, postLoginUser, postUser, middlewares } from './controllers'
import makeCallback from './express-callback';

const port = 3000 || process.env.port;
var app = express();
middlewares.accessControl( app );
middlewares.bodyParser( app );
middlewares.multer;

app.post( '/users', makeCallback( postUser ) );
app.post( '/users/login', makeCallback( postLoginUser ) );
app.get( '/users/:_id', makeCallback( getUser ) );

app.listen(port, () => console.log( `Listening on port: ${port}` ));