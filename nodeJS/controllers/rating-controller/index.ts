import ratingService from '../../use-cases/rating-use-cases';
import makePostRating from './post-rating';
import makePutRating from './put-rating';
import makeGetAverageRating from './get-average-rating';
import makeGetUserRating from './get-user-rating';
import makeGetTopRated from './get-top-rated';

const postRating = makePostRating( ratingService.insertRating );
const putRating = makePutRating( ratingService.updateRating );
const getAverageRating = makeGetAverageRating( ratingService.averageRating );
const getUserRating = makeGetUserRating( ratingService.userRating );
const getTopRated = makeGetTopRated( ratingService.topRated );

export { postRating, putRating, getAverageRating, getUserRating, getTopRated };