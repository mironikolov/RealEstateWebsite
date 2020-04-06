import EmailValidator from './email-validator';

export default function buildMakeUser({ emailValidator = EmailValidator }){
    return function makeUser({
        _id = '',
        username = '',
        password = '',
        email = '',
        phoneNumber = '',
        createdOn = Date.now()
    } = {}) {
        //if ( !Id.isValidId( id ) ) {
          //  throw new Error( 'User must have valid id.' );
        //}

        //if ( !username ) {
          //  throw new Error( 'User must have username.' );
        //}

        
        //if ( !password && password.length < 6 ) {
          //  throw new Error( 'User must have username.' );
        //}

        //String can brake string
        if ( email != '') {
          if ( !emailValidator( email ) ) {
            throw new Error( 'User must have valid email.' );
          }
        }

        //if( !phoneNumber ){
          //  throw new Error( 'User must have phone number.' );
        //}

        return Object.freeze({
            getId: () => _id,
            getUsername: () => username,
            getPassword: () => password,
            getEmail: () => email,
            getPhoneNumber: () => phoneNumber,
            getCreatedOn: () => createdOn
        });
    };
}