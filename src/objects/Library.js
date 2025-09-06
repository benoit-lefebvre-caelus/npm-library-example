/**
 * Library object class
 */
export default class Library {
    #id_library;
    #books

    constructor({ id_library = null, books = [] } = {}) {
        this.#id_library = id_library;
        this.#books = books;
    }

    // Getters
    get id_library() {
        return this.#id_library;
    }
    get books() {
        return this.#books;
    }

    // Setters
    set id_library(id_library) {
        this.#id_library = id_library;
    }
    set books(books) {
        this.#books = books;
    }

    // Methods
    addBook(book) {
        this.#books.push(book);
    }
    removeBook(book) {
        this.#books = this.#books.filter(b => b.id_book !== book.id_book);
    }

    // Convert to JSON
    toJSON() {
        return {
            id_library: this.#id_library,
            books: this.#books.map(book => book.toJSON()),
        };
    }
}
