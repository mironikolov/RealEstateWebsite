import dataAccess from '../../data-access';
const ratingsDb = dataAccess.ratingsDb;
import makeInsertRating from './insert-rating';
import makeUpdateRating from './update-rating';
import makeAverageRating from './average-rating';
import makeUserRating from './user-rating';

const insertRating = makeInsertRating( ratingsDb );
const updateRating = makeUpdateRating( ratingsDb );
const averageRating = makeAverageRating( ratingsDb );
const userRating = makeUserRating( ratingsDb );

const ratingService = Object.freeze({
    insertRating,
    updateRating,
    averageRating,
    userRating
});

export default ratingService;
export { insertRating, updateRating, averageRating, userRating };
