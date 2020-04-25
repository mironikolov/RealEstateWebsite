import { addUser, findByIdUser, loginUser, updateUser} from '../../use-cases/user-use-cases';
import makeGetUser from './get-user';
import makePostLoginUser from './post-login-user';
import makePostUser from './post-user';
import middlewares from '../middlewares'
import logoutUser from './logout-user';
import makePutUser from './put-user'
//todo: add not found, middlewares???

const getUser = makeGetUser({ findByIdUser });
const postLoginUser = makePostLoginUser({ loginUser });
const postUser = makePostUser({ addUser });
const putUser = makePutUser({ updateUser });

const userController = Object.freeze({
    getUser,
    postLoginUser,
    postUser,
    logoutUser,
    putUser
});

export default userController;
export { getUser, postUser, postLoginUser, logoutUser, putUser, middlewares };