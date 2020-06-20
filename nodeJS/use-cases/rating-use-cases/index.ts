import dataAccess from '../../data-access';
const ratingsDb = dataAccess.ratingsDb;
import makeInsertRating from './insert-rating';
import makeUpdateRating from './update-rating';
import makeAverageRating from './average-rating';
import makeUserRating from './user-rating';
import makeTopRated from './top-rated';

//Използване на factory функциите
const insertRating = makeInsertRating( ratingsDb );
const updateRating = makeUpdateRating( ratingsDb );
const averageRating = makeAverageRating( ratingsDb );
const userRating = makeUserRating( ratingsDb );
const topRated = makeTopRated( ratingsDb );

//Създаване на обект с функциите на оценяването
const ratingService = Object.freeze({
    insertRating,
    updateRating,
    averageRating,
    userRating,
    topRated
});

export default ratingService;
export { insertRating, updateRating, averageRating, userRating, topRated };
