import makeAddUser from './add-user';
import makeLoginUser from './login-user';
import makeFindByIdUser from './find-by-id-user';
import dataAccess from '../../data-access';
import makeUpdateUser from './update-user';
import makeFindByEmailUser from './find-by-email';
import makeFindByTokenUser from './find-by-token';
const usersDb = dataAccess.usersDb;

const addUser = makeAddUser({ usersDb });
const findByIdUser = makeFindByIdUser({ usersDb });
const loginUser = makeLoginUser({ usersDb });
const updateUser = makeUpdateUser({ usersDb });
const findByEmailUser = makeFindByEmailUser({ usersDb });
const findByTokenUser = makeFindByTokenUser({ usersDb });

const userService = Object.freeze({
    addUser,
    findByIdUser,
    loginUser,
    updateUser,
    findByEmailUser,
    findByTokenUser
});

export default userService;
export { addUser, findByIdUser, loginUser, updateUser, findByEmailUser, findByTokenUser };