import ratingService from '../../use-cases/rating-use-cases';
import makePostRating from './post-rating';
import makePutRating from './put-rating';
import makeGetAverageRating from './get-average-rating';

const postRating = makePostRating( ratingService.insertRating );
const putRating = makePutRating( ratingService.updateRating );
const getAverageRating = makeGetAverageRating( ratingService.averageRating );

export { postRating, putRating, getAverageRating };