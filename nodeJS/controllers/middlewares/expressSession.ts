import session from 'express-session';
import { Express } from 'express';
import connectMongo  from 'connect-mongo';
import environment from '../../env/environment';

const MongoStore = connectMongo(session);
const expire = (1000 * 60 * 60 * 24)  // = 1 day

export default ( app: Express ) => {
    
    app.use( session({
        secret: environment.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: expire },
        store: new MongoStore({
            url: environment.DB_URL+"/"+environment.DB_NAME,
            mongoOptions: { useNewUrlParser: true },
            ttl: expire
        })
    }));
}