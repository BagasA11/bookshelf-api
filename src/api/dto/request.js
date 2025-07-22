import { ValidationError } from "../../error/err.js";

// import { ValidationError } from "../../error/err";

export class BookCreateDto {
  constructor({
    name = null, year = 0, 
    author = null, summary = null, 
    publisher = null, pageCount = 0, 
    readPage = 0, reading = false
  } = {}) {
    this.name = name;
    this.year = year;
    this.author = author;
    this.summary = summary;
    this.publisher = publisher;
    this.pageCount = pageCount;
    this.readPage = readPage;
    this.reading = reading;
  }

  validate() {
    if (this.name === null || typeof this.name !== "string") {
      throw new ValidationError("Gagal menambahkan buku. Mohon isi nama buku", 'name');
      // throw new ValidationError("Gagal menambahkan buku. Mohon isi nama buku");
    }

    if ((typeof this.readPage !== 'number') || (typeof this.pageCount !== 'number')) {
      throw new ValidationError('readPage or pageCount type must be number', ['readPage', 'pageCount'])
    }

    if (this.readPage > this.pageCount) {
      throw new ValidationError("Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount", 'readPage');
      // throw new Error("Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount");
    }

    return true;
  }

  // convert dto class to json like object
  get plainObject() {
    // create an object using class property
    // then return it
    const dtoObject = {
      name: this.name,
      year: Number(this.year),
      author: String(this.author),
      summary: String(this.summary),
      publisher: String(this.publisher),
      pageCount: this.pageCount,
      readPage: this.readPage,
      reading: Boolean(this.reading)
    };
    return dtoObject;
  }
}
