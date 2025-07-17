// type definition for returned response

// fail {400, 404}
// @param {string} message
export const FailRequest = (message) => {
    return {
        status: 'fail',
        message: message
    };
};

// onsuccess {200, 201}

/*
* @param {string} bookID, message
*/
export const StatusCreated = (bookID, message) => {
    return {
        status: 'success',
        message: String(message),
        data: {
            bookId: bookID,
        }
    };
};

export const Success = (message) => {
    return {
        status: 'success',
        message: message
    };
};

export const BookDetail = (book) => {
    return {
        status: 'success',
        data: {
            book: book,
        }
    };
};

export const BookList = (books) => {
    return {
        status: 'success',
        data: {
            books: books,
        }
    };
};