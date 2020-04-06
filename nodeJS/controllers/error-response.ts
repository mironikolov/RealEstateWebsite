export default function makeErrorResponse( error: Error ){
    console.log( error );

    return{
        headers: {
            'Content-Type': 'application/json',
          },
          statusCode: 400,
          body: { error: error.message }
    }
}