const express = require( 'express' );
const app = express();
const port = 3000 || process.env.port;
const bodyParser = require( 'body-parser' );
const fs = require('fs');
const uploadPicture = require('./controllers/middlewares/multer');
const url = require('url');

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
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use(bodyParser.json());

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
app.post( '/images/:propertyID', ( req, res ) => {
  
  fs.readdir( `${__dirname}/Images/${req.params.propertyID}`, ( err, filenames ) => {
    if( err ){
      console.log( err );
      return;
    }
    if ( filenames == null || req.body.pictureName == undefined) {
      res.sendFile( __dirname + '/Images/defaultImages/1.jpg' );
      return;
    }
    console.log(  req.body );
    res.sendFile( __dirname + '/Images/'+ req.params.propertyID + '/' + req.body.pictureName );
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

app.post( '/test', ( req, res ) => {
  addPicturesToProperty( "5e7b67797457b42db0aa1ade" );
  res.json('test'); 
});

function addPicturesToProperty( propertyID ){
  let picNames = new Array();

  fs.readdir( `${__dirname}/Images/${propertyID}`, ( err, filenames ) => {
    if( err ){
      console.log( err );
      return;
    }

    filenames.forEach( filename => {
      picNames.push( filename );
    });
  })

  Property.findById( propertyID, ( err, property ) => {
    if( err ){
      console.log( err );
      return;
    }

    property.picturesNames = picNames;
    property.save();
  })
  
}

//Create new property
//Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
app.post( '/property/', uploadPicture.any(), ( req, res) =>{
  
  db.collection('properties').insertOne(req.body)
  .then( result => {
    console.log(req.body)
    
    fs.renameSync(  `${__dirname}/Images/temp`, `${__dirname}/Images/${result.insertedId}`, err => {
      console.log( "rename folder" );
    } );
    
    addPicturesToProperty( result.insertedId );
    
    fs.mkdirSync( `${__dirname}/Images/temp`, err => {
      console.log( "create temp" );
    } );
    
    res.json( "Property inserted" );

  })
  //.catch( res.json( "Property insert fail" ) );
} );

//Upload pictures
app.post( '/pictures-upload/', uploadPicture.any(), ( req, res ) => {
  console.log(req.files);
  //console.log( req.file.originalname );
  res.json("sup");
} );

//Update property
app.post( '/property/edit/:propertyID', ( req, res) =>{
  
  Property.findOne( { _id: req.params.propertyID }, ( err, property ) => {
    if( err ){
      res.json( "fail" );
    }
    property.overwrite( req.body );
    property.save();
    res.json( "Edited" );
  });
} );

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
//add validation bitch
app.post( '/users/', ( req, res) =>{
  
  db.collection('users').insertOne(req.body);
  res.status(200).end();
} );

//delete property
app.post( '/property/delete', ( req, res) =>{

  fs.rmdir( `${__dirname}/Images/${ req.body.propertyID }`, { recursive: true }, () => {
    console.log( "dir delete" );
  });

  Property.deleteOne( { _id: req.body.propertyID }, err => {
    if( err ){
      return res.status(500).json( "Could not delete property:" + err );
    }
    else{
      return res.status(200).json( "Success" );
    }
  } );
} );

app.listen(port, () => console.log( `Listening on port: ${port}` ));

module.exports = mongoose;