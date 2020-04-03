import multer from "multer";

//set storage
var storage = multer.diskStorage(
    {
        destination: ( req, file, path ) => {
            if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
                path( null, `Images/temp`);
            }
            else{
                path( Error('file not supported'), `Images/err` )
            }
        },
        filename: ( req, file, filename ) => {
            filename( null, file.originalname );
        }
    }
);

var uploadPicture = multer({ storage:storage });
//module.exports = uploadPicture;
export default uploadPicture;