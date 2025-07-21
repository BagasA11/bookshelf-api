
export const Book = (id, data)=>{
    const {
        name, year, author,
        summary, publisher,
        pageCount, readPage,
        reading
    } = data;

    const book = {
        id: String(id),
        name: name,
        year: Number(year),
        author: author,
        summary: summary,
        publisher: publisher,
        pageCount: Number(pageCount),
        readPage: Number(readPage),
        finished: Number(readPage) === Number(pageCount)? true : false ,
        reading: Boolean(reading),
        insertedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    return book;
};