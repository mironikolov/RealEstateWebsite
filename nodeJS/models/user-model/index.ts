import buildMakeUser from './user';
import EmailValidator from './email-validator';

const emailValidator = EmailValidator;
const makeUser = buildMakeUser({ emailValidator });
export default makeUser;