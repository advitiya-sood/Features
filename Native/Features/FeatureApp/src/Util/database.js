import * as SQLite from 'expo-sqlite';
import { Place } from '../Model/place';

const database=SQLite.openDatabase('places.db');


export function init(){
    const promise=new Promise((resolve,reject)=>{
        database.transaction((tx)=>{
            tx.executeSql(`
            CREATE TABLE IF NOT EXISTS places(
                id  INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lon REAL NOT NULL
            )`,[],
            ()=>{  resolve(); },                  // two arrow functions passed for resolve and reject
            (_,error)=>{  reject(error); }
            )
        })
    })
    return promise;
}



export const  insertPlaces=(place)=>{
    const promise= new Promise((resolve,reject)=>{
        database.transaction((tx)=>{
            tx.executeSql(`
            INSERT INTO places(title,imageUri,address,lat,lon) VALUES (?,?,?,?,?)`,
            [
                place.title,
                place.imageUrl,
                place.address,
                place.location.lat,
                place.location.lon,
            ],
            (_,result)=>{
                resolve(result)},
            (_,err)=>{reject(err);}
            )
        })
    }) 
    return promise;
}



export const fetchData=()=>{
    const promise=new Promise((resolve,reject)=>{
        database.transaction((tx)=>{
            tx.executeSql(`SELECT * FROM places`,[],
            (_,result)=>{
                const places=[]
                for ( const place of result.rows._array){
                    places.push(
                     new Place(
                         place.title,
                         place.imageUri,
                         place.address,
                         {lat: place.lat, lng: place.lon},
                          place.id,
                         )
                         )}
                resolve(places)
            },
            (_,err)=>{reject(err)}
            )
        })
    })
    

    return promise;
}