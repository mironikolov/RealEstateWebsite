import { Request, Response } from 'express';

export default function makeGetByIdProperty({ findOneByIdProperty }: { findOneByIdProperty: any }){
    return async function getByIdProperty( httpRequest: Request, httpResponse: Response ) {
        try {
            const propertyId  = httpRequest.params.propertyId;
            const property = await findOneByIdProperty( propertyId );
            
            return httpResponse.status(200).send( property ).end();
        } catch (error) {            
            return httpResponse.status(500).send({ Error: error }).end();
        }
    }
}