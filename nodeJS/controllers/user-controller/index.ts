import { addUser, findByIdUser, loginUser, updateUser} from '../../use-cases/user-use-cases';
import userService from '../../use-cases/user-use-cases';
import makeGetUser from './get-user';
import makePostLoginUser from './post-login-user';
import makePostUser from './post-user';
import logoutUser from './logout-user';
import makePutUser from './put-user';
import makePostPasswordReset from './password-reset';
import makePutPasswordReset from './put-password-reset';

const getUser = makeGetUser({ findByIdUser });
const postLoginUser = makePostLoginUser({ loginUser });
const postUser = makePostUser({ addUser });
const putUser = makePutUser({ updateUser });
const postPasswordReset = makePostPasswordReset( userService );
const putPasswordReset = makePutPasswordReset( userService );

const userController = Object.freeze({
    getUser,
    postLoginUser,
    postUser,
    logoutUser,
    putUser,
    postPasswordReset,
    putPasswordReset
});

export default userController;
export { getUser, postUser, postLoginUser, logoutUser, putUser, postPasswordReset, putPasswordReset };