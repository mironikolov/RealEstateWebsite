import session from 'express-session';
import { Express } from 'express';
import connectMongo  from 'connect-mongo';
import environment from '../../env/environment';

const MongoStore = connectMongo(session);

export default ( app: Express ) => {
    app.use( session({
        secret: environment.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            url: environment.DB_URL+"/"+environment.DB_NAME,
            mongoOptions: { useNewUrlParser: true },
            ttl: 1 * 24 * 60 * 60 // = 1 day
        })
    }));
}