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
    const { 
        name, 
        reading, 
        finished 
    } = filter;

    console.log(`<${name} ${reading} ${finished}>`);

    return bookList.
    filter((book) => {

        var matchName;
        if (typeof name !== 'undefined'){
            matchName = book.name.toLowerCase().includes(name.toLowerCase());
        } else {
            matchName = true;
        }

        var matchReading;
        if (typeof reading !== 'undefined'){
            matchReading = book.reading === Boolean(Number(reading));
        } else {
            matchReading = true;
        }

        var matchFinished;
        if (typeof finished !== 'undefined'){
            matchFinished = (book.finished === Boolean(Number(finished)));
        } else{
            matchFinished = true;
        }
    
        return matchName && matchReading && matchFinished;
    }).map(({id, name, publisher}) => ({id, name, publisher}));
}

// export function list(){
//     return bookList;
// } 

function getIndex(bookID){
    const index = bookList.findIndex(book => book.id === String(bookID));
    return index;
}

export function getBookDetail(bookID){
    const bookDetail = bookList.find((bookData) => bookData.id === String(bookID));
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