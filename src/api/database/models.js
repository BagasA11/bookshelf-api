import {nanoid} from "nanoid";

export const Book = (data)=>{
    const {
        name, year, author,
        summary, publisher,
        pageCount, readPage,
        finished, reading
    } = data;

    return {
        id: nanoid(),
        name: name,
        year: Number(year),
        author: author,
        summary: summary,
        publisher: publisher,
        pageCount: Number(pageCount),
        readPage: Number(readPage),
        finished: Boolean(finished),
        reading: Boolean(reading),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
};