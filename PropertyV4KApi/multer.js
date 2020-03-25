const multer = require("multer");

//set storage
var storage = multer.diskStorage(
    {
        destination: ( req, file, path ) => {
            if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
                path( null, `Images/temp`);
            }
            else{
                path( {error:'file not supported'}, false )
            }
        },
        filename: ( req, file, filename ) => {
            filename( null, file.originalname );
        }
    }
);

var uploadPicture = multer({ storage:storage });
module.exports = uploadPicture;