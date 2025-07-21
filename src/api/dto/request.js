import { ValidationError } from "../../error/err.js";

// import { ValidationError } from "../../error/err";

export class BookCreateDto {
  constructor({
    name, year, author, summary, publisher, 
    pageCount, readPage, reading
  }) {
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
    if (!this.name || typeof this.name !== "string") {
      throw new ValidationError("Gagal menambahkan buku. Mohon isi nama buku", 'name');
      // throw new ValidationError("Gagal menambahkan buku. Mohon isi nama buku");
    }

    if (this.readPage > this.pageCount) {
      throw new ValidationError("Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount", 'readPage');
      // throw new Error("Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount");
    }

    return true;
  }

  toObject() {
    const dtoObject = {
      name: String(this.name),
      year: Number(this.year),
      author: String(this.author),
      summary: String(this.summary),
      publisher: String(this.publisher),
      pageCount: Number(this.pageCount),
      readPage: Number(this.readPage),
      reading: Boolean(this.reading)
    };
    return dtoObject;
  }
}
