import {Book} from './models.js';

const BookArray = [];

export function insert(data){
    const book = Book(data);
    BookArray.push(book);
    return book.id;
}

export function getList(){
    return BookArray.map(({ id, name, publisher }) =>{
        return {id,
        name, 
        publisher}
    });
}

// export function list(){
//     return BookArray;
// } 

export function getDetail(bookID){
    const bookDetail = BookArray.filter(book => book.id === String(bookID));
    // console.log(bookDetail);
    if (bookDetail.length === 0){
        return null;
    }
    return Book(bookDetail[0]);
}

export function update(bookID){}

export function remove(bookID){}