import makeAddUser from './add-user';
import makeLoginUser from './login-user';
import makeFindByIdUser from './find-by-id-user';
import dataAccess from '../../data-access';
import makeUpdateUser from './update-user';
const usersDb = dataAccess.usersDb;

const addUser = makeAddUser({ usersDb });
const findByIdUser = makeFindByIdUser({ usersDb });
const loginUser = makeLoginUser({ usersDb });
const updateUser = makeUpdateUser({ usersDb });

const userService = Object.freeze({
    addUser,
    findByIdUser,
    loginUser,
    updateUser
});

export default userService;
export { addUser, findByIdUser, loginUser, updateUser };