import multer from "multer";

//set storage
var storage = multer.diskStorage(
    {
        destination: ( req, file, path ) => {
            if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
                //if there is _id in data, add to folder else add to temp
                const id = JSON.parse(req.body.data)._id;
                if (id == 'undefined' || id == null) {
                    path( null, `Images/temp`);
                }
                else {
                    path( null, `Images/${id}`);
                }
                
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
export default uploadPicture;