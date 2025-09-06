/**
 * Book object class
 */
export default class Book {
    #id_book;
    #title;
    #author;

    constructor({ id_book = null, title = null, author = null } = {}) {
        this.#id_book = id_book;
        this.#title = title;
        this.#author = author;
    }

    // Getters
    get id_book() {
        return this.#id_book;
    }
    get title() {
        return this.#title;
    }
    get author() {
        return this.#author;
    }

    // Setters
    set id_book(id_book) {
        this.#id_book = id_book;
    }
    set title(title) {
        this.#title = title;
    }
    set author(author) {
        this.#author = author;
    }

    // Convert to JSON
    toJSON() {
        return {
            id_book: this.#id_book,
            title: this.#title,
            author: this.#author,
        };
    }
}
