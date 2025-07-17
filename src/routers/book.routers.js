import { insertBookHandler, bookListHandler, 
    bookDetailHandler, updateBookHandler, 
    deleteBookHandler } from "../api/controllers/book.controllers.js";

export const bookRouters = [
    {
        method: 'POST',
        path: '/books',
        handler: insertBookHandler
    },
    {
        method: 'GET',
        path: '/books',
        handler: bookListHandler
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: bookDetailHandler
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBookHandler
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookHandler
    },
] 