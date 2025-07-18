import {Book} from './models.js';
import { NotFoundError } from '../../error/err.js';
import { nanoid } from 'nanoid';

const bookList = [];

export function addBook(data){
    const id = nanoid();
    const book = Book(id, data);
    bookList.push(book);
    return book.id;
}

export function getBookList(filter){
    const { name, reading, finished } = filter;

    return bookList.
    filter((book) => {
        const matchName = name? 
            book.name.toLowerCase().includes(name.toLowerCase()):
            true;
        const matchReading = typeof reading !== 'undefined'?
            book.reading === Boolean(Number(reading)):
            true;
        const matchFinished = typeof finished !== 'undefined'?
            book.finished === Boolean(Number(finished)):
            true;
        return matchName && matchReading && matchFinished;
    }).map(({id, name, publisher}) => ({id, name, publisher}));
}

// export function list(){
//     return bookList;
// } 

function getIndex(bookID){
    return bookList.findIndex(book => book.id === String(bookID));
}

export function getBookDetail(bookID){
    const bookDetail = bookList.find((book) => book.id === String(bookID));
    return bookDetail;
}

export function updateBook(bookID, bookData){
    const index = getIndex(String(bookID));
    console.log(index);
    if (index < 0){
        throw new NotFoundError(`Gagal memperbarui buku. Id tidak ditemukan`);
    }
    bookList[index] = Book(bookID, bookData);
}

export function removeBook(bookID){
    const index = getIndex(String(bookID));
    if (index < 0){
        throw new NotFoundError(`book data with id:${bookID} not found`);
    }
    bookList.splice(index, 1);
}