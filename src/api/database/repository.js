import {Book} from './models.js';

const BookArray = [];

export function insert(data){
    BookArray.push(Book(data));
}

export function getList(){
    return BookArray.map(({ id, name, publisher }) =>{
        return {id,
        name, 
        publisher}
    });
}

export function list(){
    return BookArray;
} 
