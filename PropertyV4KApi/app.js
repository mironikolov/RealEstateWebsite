const express = require( 'express' );
const app = express();
const port = 3000 || process.env.port;
const bodyParser = require( 'body-parser' );
const fs = require('fs');
var formidable = require('formidable');

const mongoose = require( 'mongoose' ),
  Property = require( './Models/propertyModel' ),
  User = require( './Models/userModel.js' );

mongoose.connect('mongodb://localhost:27017/propertyDB',{ useNewUrlParser :"true"});

const db = mongoose.connection;
db.on('error', ()=>{
    console.log("error");
});

db.once('open', ()=> {
  console.log("we good");
});

//Post MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Find all properties
app.get( "/", ( req, res ) => {
  Property.find({}, function( err, properties ){
    if( err ){
      res.send( err );
    }

    res.send( properties );
  });
});



//Find picture by propertyid
app.get( '/images/:propertyID', ( req, res ) => {
  fs.access(`./images/${req.params.propertyID}/1.jpg`, fs.F_OK, (err) => {
    if (err) {
      res.sendFile( __dirname + '/Images/defaultImages/1.jpg' );
      return;
    }
    res.sendFile( __dirname + '/Images/' + req.params.propertyID + '/1.jpg' );
    console.log('file send');
  });
  
});

//Find one property
app.get( '/property/:propertyID', ( req, res ) => {
  Property.findById( req.params.propertyID, ( err, property ) => {
    if( err ){
      res.send( "err" );
    }
    res.send( property );
  })
});

//Create new property
app.post( '/property/', ( req, res) =>{
  db.collection('properties').insertOne(req.body);
  res.send("hi");
} );

//Upload picture
//app.post( '/picture/', ( req, res) =>{
  //fs.readFile(req.readFile){}

//} );

//Find user
app.get( '/users/:username&:password', ( req, res ) => {
  User.findOne( {'username':req.params.username, 'password':req.params.password}, ( err, user ) => {
    if( err ){
      res.send( err );
    }
    res.send( user );
  } )
} );

//Find user by ID
app.get( '/users/:userID', ( req, res ) => {
  User.findById( req.params.userID , ( err, user ) => {
    if( err ){
      res.send( err );
    }
    res.send( user );
  } )
} );

//Create new user
app.post( '/users/', ( req, res) =>{
  console.log(JSON.stringify(req.body));
  db.collection('users').insert(req.body);
  res.send("hi");
} );


app.listen(port, () => console.log( `Listening on port: ${port}` ));

module.exports = mongoose;