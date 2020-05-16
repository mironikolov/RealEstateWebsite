import multer from "multer";
import fs from 'fs';
import env from '../../env/environment';
import path2 from 'path';

//set storage
var storage = multer.diskStorage(
    {
        destination: ( req, file, path ) => {
            
            if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
                //if there is _id in data, add to folder else add to temp
                const id = req.session?.user._id;
                if (id == 'undefined' || id == null) {
                    path( null, `Images/temp`);
                }
                else {
                    const files = fs.readdirSync( `${env.ROOT_DIR}/Images/${id}`) ;
                    if ( files != null ) {
                        for (const file of files) {
                            fs.unlink(path2.join(`${env.ROOT_DIR}/Images/${id}`, file), err => {
                                if (err) throw err;
                            });
                        }
                    }

                    fs.mkdirSync( `${env.ROOT_DIR}/Images/${id}`, { recursive: true });
                    path( null, `Images/${id}` );
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