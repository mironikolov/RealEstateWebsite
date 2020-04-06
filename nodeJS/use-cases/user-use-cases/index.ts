import makeAddUser from './add-user';
import makeLoginUser from './login-user';
import makeFindByIdUser from './find-by-id-user';
import dataAccess from '../../data-access';
const usersDb = dataAccess.usersDb;

const addUser = makeAddUser({ usersDb });
const findByIdUser = makeFindByIdUser({ usersDb });
const loginUser = makeLoginUser({ usersDb });

const userService = Object.freeze({
    addUser,
    findByIdUser,
    loginUser
});

export default userService;
export { addUser, findByIdUser, loginUser };