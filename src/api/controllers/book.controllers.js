import { addBook, getBookList, getBookDetail, updateBook, removeBook } from "../database/repository.js";
import { BookCreateDto } from "../dto/request.js";
import { BookList, BookDetail, StatusCreated, FailRequest, Success} from "../dto/response.js";
import { EnumStatus, ResponseHelper } from "../utils/responsehelper.js";

export function insertBookHandler(req, h){
    const payload  = req.payload;

    try {
        const input = new BookCreateDto(payload);
        input.validate();
        const inputObject = input.toObject();
        const bookID = addBook(inputObject);

       return ResponseHelper(h, StatusCreated(bookID, 'Buku berhasil ditambahkan'), EnumStatus['CREATED']);
    
    } catch (error) {
        return ResponseHelper(h, FailRequest(`${error.message}`), EnumStatus['BADREQUEST']);
    }    
} 

export function bookListHandler(req, h){
    const { name, reading, finished } = req.query; //query param from url using req.query.
    // ex: /page?name=xxx&year=2025
    
    const list = getBookList({ name, reading, finished });
    
    // code is 200
    return ResponseHelper(h, BookList(list), EnumStatus['SUCCESS']);
}

export function bookDetailHandler(req, h){
    const bookID = req.params.bookId;

    const bookDetail = getBookDetail(String(bookID));
    // console.log(`buku: ${bookDetail}`);
    if (typeof bookDetail === 'undefined'){
        // status code is 404
        return ResponseHelper(h, FailRequest('Buku tidak ditemukan'), EnumStatus['NOTFOUND']);
    }
    // status code 200
    return ResponseHelper(h, BookDetail(bookDetail), EnumStatus['SUCCESS']);
}

export function updateBookHandler(req, h){
    const bookId = String(req.params.bookId);
    const payload = req.payload;

    try{
        const input = new BookCreateDto(payload);
        input.validate();

        updateBook(bookId, input.toObject());
        // status code is 200
        return ResponseHelper(h, Success('Buku berhasil diperbarui'), EnumStatus['SUCCESS']);

    } catch(error){
        // console.error(`${error.name}:${error.message}`);

       if (error.name === String('validation error')){

            var messageErr;
            if (error.field === String('name')){
                messageErr = 'Gagal memperbarui buku. Mohon isi nama buku';
            } else {
                messageErr = 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount';
            }

            // status code is 400
            return ResponseHelper(h, FailRequest(messageErr), EnumStatus['BADREQUEST']);
        } else if (error.name === String('not found error')){
            // status code is 404
            return ResponseHelper(h, FailRequest(String(error.message)), EnumStatus['NOTFOUND']);
        }

        return h.response(FailRequest(`ups something went wrong ${error.message}`)).code(500);
    }
}

export function deleteBookHandler(req, h){
    const bookId = req.params.bookId;

    try {
        removeBook(bookId);
        return ResponseHelper(h, Success(`Buku berhasil dihapus`), EnumStatus['SUCCESS']);

    } catch (error) {
        console.error(error);
        return ResponseHelper(h, FailRequest('Buku gagal dihapus. Id tidak ditemukan'), EnumStatus['NOTFOUND']);
    }
}
