import { addUser, findByIdUser, loginUser} from '../use-cases';
import makeGetUser from './get-user';
import makePostLoginUser from './post-login-user';
import makePostUser from './post-user';
import middlewares from './middlewares'
//add not found

const getUser = makeGetUser({ findByIdUser });
const postLoginUser = makePostLoginUser({ loginUser });
const postUser = makePostUser({ addUser });

const userController = Object.freeze({
    getUser,
    postLoginUser,
    postUser
});

export default userController;
export { getUser, postUser, postLoginUser, middlewares };