import { insert, getList, getDetail } from "../database/repository.js";
import { BookCreateDto } from "../dto/request.js";
import { BookList, BookDetail, StatusCreated, FailRequest} from "../dto/response.js";

export function insertHandler(req, h){
    const payload  = req.payload;

    try {
        const input = new BookCreateDto(payload);
        input.validate();

        const bookID = insert(input.toObject());

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
    const list = getList();

    return h.
    response(BookList(list)).
    code(200);
}

export function bookDetailHandler(req, h){
    const bookID = req.params.bookId;

    const bookDetail = getDetail(String(bookID));
    // console.log(`buku: ${bookDetail}`);

    if (bookDetail === null){
        return h.response(FailRequest('book not found')).
        code(404);
    }
    return h.response(BookDetail(bookDetail)).code(200);
}