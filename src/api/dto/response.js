// type definition for returned response

// fail {400, 404}
// @param {string} message
export const failRequest = (message) => {
    return {
        status: 'fail',
        message: message
    };
};

// onsuccess {200, 201}

/*
* @param {string} bookID, message
*/
export const statusCreated = (bookID, message) => {
    return {
        status: 'success',
        message: message,
        data: {
            bookId: bookID,
        }
    };
};

export const success = (message) => {
    return {
        status: 'success',
        message: message
    };
};

export const bookDetail = (message, book) => {
    return {
        status: 'success',
        message: message,
        data: {
            book: book,
        }
    };
};

export const bookList = (message, books) => {
    return {
        status: 'success',
        message: message,
        data: {
            books: books,
        }
    };
};