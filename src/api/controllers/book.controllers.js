import { addBook, getBookList, getBookDetail, updateBook, removeBook } from "../database/repository.js";
import { BookCreateDto } from "../dto/request.js";
import { BookList, BookDetail, StatusCreated, FailRequest, Success} from "../dto/response.js";

export function insertBookHandler(req, h){
    const payload  = req.payload;

    try {
        const input = new BookCreateDto(payload);
        input.validate();

        const bookID = addBook(input.toObject());

        return h.
        response(StatusCreated(bookID, 'a book is created')).
        code(200);
    
    } catch (error) {
        return h.
        response(FailRequest(`failed to create book with error:${error}`)).
        code(400);
    }    
} 

export function bookListHandler(req, h){
    const list = getBookList();

    return h.
    response(BookList(list)).
    code(200);
}

export function bookDetailHandler(req, h){
    const bookID = req.params.bookId;

    const bookDetail = getBookDetail(String(bookID));
    // console.log(`buku: ${bookDetail}`);

    if (bookDetail === null){
        return h.response(FailRequest('book not found')).
        code(404);
    }
    return h.response(BookDetail(bookDetail)).code(200);
}

export function updateBookHandler(req, h){
    const bookId = String(req.params.bookId);
    const payload = req.payload;

    try{
        const input = new BookCreateDto(payload);
        input.validate();

        updateBook(bookId, input);

        return h.response(Success(`update book ${bookId} success`)).
        code(200);

    } catch(error){
        console.error(error);
        if(error.name === 'not found error'){
            return h.response(FailRequest(`book with id:${bookId} not found`)).
            code(404);
        } else if(error.name === 'validation error'){
            return h.response(FailRequest(`invalid request, err:${error}`)).
            code(404);
        }
        return h.response(FailRequest('ups something went wrong')).
        code(500); 
    }
}

export function deleteBookHandler(req, h){
    const bookId = req.params.bookId;

    try {
        removeBook(String(bookId));
        return h.response(Success(`book with id:${bookId} succesfuly removed`)).
        code(200);

    } catch (error) {
        console.error(error);
        return h.response(FailRequest(`book with id:${bookId} not found`)).
        code(404);
    }
}