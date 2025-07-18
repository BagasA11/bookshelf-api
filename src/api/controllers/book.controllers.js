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
        response(StatusCreated(bookID, 'Buku berhasil ditambahkan')).
        code(201);
    
    } catch (error) {
        return h.
        response(FailRequest(`${error.message}`)).
        code(400);
    }    
} 

export function bookListHandler(req, h){
    const { name, reading, finished } = req.query;
    
    const list = getBookList({ name, reading, finished });
    
    return h.
    response(BookList(list)).
    code(200);
}

export function bookDetailHandler(req, h){
    const bookID = req.params.bookId;

    const bookDetail = getBookDetail(String(bookID));
    // console.log(`buku: ${bookDetail}`);
    if (!bookDetail){
        return h.response(FailRequest('Buku tidak ditemukan')).
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

        return h.response(Success('Buku berhasil diperbarui')).
        code(200);

    } catch(error){
        console.error(`${error.name}:${error.message}`);

       if (error.name === String('validation error')){
            const fieldMessages = {
            name: 'Gagal memperbarui buku. Mohon isi nama buku',
            default: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            };

            const message = fieldMessages[error.field] || fieldMessages.default;

            return h.response(FailRequest(message)).code(400);

        } else if (error.name === String('not found error')){
            return h.response(FailRequest(String(error.message))).
            code(404);
        }

        return h.response(FailRequest(`ups something went wrong ${error.message}`)).code(500);
    }
}

export function deleteBookHandler(req, h){
    const bookId = req.params.bookId;

    try {
        removeBook(String(bookId));
        return h.response(Success(`Buku berhasil dihapus`)).
        code(200);

    } catch (error) {
        console.error(error);
        return h.response(FailRequest(`book with id:${bookId} not found`)).
        code(404);
    }
}
