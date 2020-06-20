import * as mongodb from 'mongodb';
import { ObjectId } from 'mongodb';

export default function makePropertiesDb( makeDb: () => Promise<mongodb.Db> ){
    return Object.freeze({
        findProperties,
        findAllByPublisherId,
        findOneById,
        insert,
        update,
        deleteProperty
    });

    //Функция за намиране на страница от намерените резултати
    async function findProperties( { ...toFind }, page: number, pageSize: number ){
        try {
            //Връзка към база данни
            const db = await makeDb();
            
            //Ако има поле id създаваме mongodb id
            if( toFind._id ){
                toFind._id = new ObjectId( toFind._id );
            }
            
            //Ако има поле с тагове създаваме заявка за търсена на обявите с тези тагове
            if ( toFind.tags ) {
                toFind.tags = { $all: toFind.tags };
            }
            
            //Колко резултата трябва да прескочим до търсената страница
            const skips = pageSize * ( page - 1 );
            //Резултат от търсенето
            const result = await db.collection( 'properties' ).find({ ...toFind }).sort({ _id: -1 }).skip( skips ).limit( pageSize ).toArray();
            //Брой на открити обяви, който показваме на потребителя
            const resultCount = await db.collection( 'properties' ).find({ ...toFind }).count();
            return { 'result': result, 'resultCount': resultCount};
            
        } catch (error) {
            throw Error;
        }
    }

    async function findAllByPublisherId( publisherID: string ){
        try {
            //Връзка към база данни
            const db = await makeDb();
            //Търсена на всички обяви, които потребител е създал
            const result = await db.collection( 'properties' ).find({ publisherId: publisherID }).toArray();
            
            return result;
        } catch (error) {
            throw Error;
        }

    }

    async function findOneById({ propertyId }: { propertyId: string }){
        try {
            //Връзка към база данни
            const db = await makeDb();
            //Търсене на обява по id
            const result = await db.collection( 'properties' ).findOne({ _id: new ObjectId( propertyId ) });
            
            return result;
        } catch (error) {
            throw Error;
        }
    }

    async function insert( propertyInfo: Object ){
        try {
            //Връзка към база данни
            const db = await makeDb();
            //Добавяне на обява към базата данни
            const result = await db.collection( 'properties' ).insertOne( propertyInfo );
            if ( result.insertedCount === 0 ) {
                return null;
            }
            
            return result;
        } catch (error) {
            throw Error;
        }
    }

    async function update({ ...propertyInfo }){
        try {
            //Връзка към база данни
            const db = await makeDb();
            propertyInfo._id = new ObjectId( propertyInfo._id );
            
            //Обновяване на обява
            const result = await db.collection( 'properties' ).updateOne({ _id : propertyInfo._id }, { $set:{ ...propertyInfo } });
            if ( result.matchedCount === 0 ) {
                return null;
            }
            return result;
        } catch (error) {
            throw Error;
        }
    }

    async function deleteProperty( propertyId: string ){
        try {
            //Връзка към база данни
            const db = await makeDb();
            //Изтриване на обява
            const result = await db.collection( 'properties' ).deleteOne({ _id : new ObjectId( propertyId ) });
            return result;
        } catch (error) {
            throw Error;
        }
    }
}