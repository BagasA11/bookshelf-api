export class BookCreateDto {
  constructor({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
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
      throw new Error("Gagal menambahkan buku. Mohon isi nama buku");
    }

    if (this.readPage > this.pageCount) {
      throw new Error("Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount");
    }

    return true;
  }

  toObject() {
    return {
      name: this.name,
      year: Number(this.year),
      author: this.author,
      summary: this.summary,
      publisher: this.publisher,
      pageCount: Number(this.pageCount),
      readPage: Number(this.readPage),
      reading: Boolean(this.reading)
    };
  }
}
