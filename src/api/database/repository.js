import {Book} from './models.js';
import { NotFoundError } from '../../error/err.js';


const bookList = [];

export function addBook(data){
    const book = Book(data);
    bookList.push(book);
    return book.id;
}

export function getBookList(){
    return bookList.map(({ id, name, publisher }) =>{
        return {id,
        name, 
        publisher}
    });
}

// export function list(){
//     return bookList;
// } 

function getIndex(bookID){
    return bookList.findIndex(book => book.id === String(bookID));
}

export function getBookDetail(bookID){
    const bookDetail = bookList.filter(book => book.id === String(bookID));
    // console.log(bookDetail);
    if (bookDetail.length === 0){
        return null;
    }
    return Book(bookDetail[0]);
}

export function updateBook(bookID, bookData){
    const index = getIndex(String(bookID));
    if (index < 0){
        throw new NotFoundError(`book data with id:${bookID} not found`);
    }
    bookList.splice(index, 1, Book(bookData));
}

export function removeBook(bookID){
    const index = getIndex(String(bookID));
    if (index < 0){
        throw new NotFoundError(`book data with id:${bookID} not found`);
    }
    bookList.splice(index, 1);
}