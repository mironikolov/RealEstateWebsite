import EmailValidator from './email-validator';

//Функция за създаване на функця, която създава потребител.
//Приема функция за валидиране на email като аргумент.
export default function buildMakeUser({ emailValidator = EmailValidator }){
  return function makeUser({
      _id = '',
      username = '',
      password = '',
      email = '',
      phoneNumber = '',
      createdOn = Date.now(),
      adminFlag = false,
      resetPasswordToken = undefined,
      resetPasswordExpires = undefined
  } = {}) {
    
    //Потребителя трябва да има име
    if ( !username ) {
      throw new Error( 'User must have username.' );
    }
        
    //Валидация на парола
    if ( !password && password.length < 6 ) {
      throw new Error( 'User must have username.' );
    }
          
    //Валидация на email
    if ( email != '') {
      if ( !emailValidator( email ) ) {
        throw new Error( 'User must have valid email.' );
      }
    }

    //Потребителя трябва да има телефонен номер
    if( !phoneNumber ){
        throw new Error( 'User must have phone number.' );
    }

    //Функцията връща обект
    return Object.freeze({
        getId: () => _id,
        getUsername: () => username,
        getPassword: () => password,
        getEmail: () => email,
        getPhoneNumber: () => phoneNumber,
        getCreatedOn: () => createdOn,
        getAdminFlag: () => adminFlag,
        getResetPasswordToken: () => resetPasswordToken,
        getResetPasswordExpires: () => resetPasswordExpires,
    });
  };
}