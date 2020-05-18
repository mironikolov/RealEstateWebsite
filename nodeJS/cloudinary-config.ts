import cloudinary from 'cloudinary';
import env from './env/environment';

export default function () {
    cloudinary.v2.config({
        cloud_name: env.CLOUDINARY_CLOUD_NAME,
        api_key: env.CLOUDINARY_API_KEY,
        api_secret: env.CLOUDINARY_API_SECRET
    });
} 