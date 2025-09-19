import { beforeEach, expect, jest } from "@jest/globals";
import Book from "../../../src/objects/Book";
import { book_get, book_list } from "../../../src/services/book.service";

describe("book.service.book_get()", () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        jest.clearAllMocks();
    });
    it("Get the book from id.", async () => {
        fetch.mockResolvedValue(Promise.resolve({
            json: async () => {
                return {
                    id_book: 2,
                    title: "Harry Potter",
                    author: "JKR"
                }
            }
        }));

        const result = await book_get(
            {
                id_book: 2
            },
        );
        expect(result).toEqual(new Book({
            id_book: 2,
            title: "Harry Potter",
            author: "JKR"
        }))
        expect(fetch).toHaveBeenCalledWith(`https://api.library.example/book?id_book=2`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

    });
    it("called without id_book and should reject with an error.", async () => {
        try {
            await book_get()
            throw new Error("Should have reject with an error but it did not.");
        } catch (err) {
            expect(err.message).toBe(`id_book parameter is required to get a specific book.`);
        }
    });
    it("called with fetch library.", async () => {
        try {
            fetch.mockResolvedValue(Promise.reject(new Error("Issue with fetch")));
            await book_get({ id_book: 1 })
            throw new Error("Should have reject with an error but it did not.");
        } catch (err) {
            expect(err.message).toBe(`Error fetching book: Issue with fetch`);
        }
    });
});
describe("book.service.book_list()", () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        jest.clearAllMocks();
    });
    it("Get the Book list.", async () => {
        fetch.mockResolvedValue(Promise.resolve({
            json: async () => {
                return [
                    {
                        id_book: 2,
                        title: "Harry Potter",
                        author: "JKR"
                    },
                    {
                        id_book: 3,
                        title: "Voyage au centre de la Terre",
                        author: "Jules Verne"
                    }
                ]
            }
        }));

        const result = await book_list();
        expect(result).toEqual([
            new Book({
                id_book: 2,
                title: "Harry Potter",
                author: "JKR"
            }),
            new Book({
                id_book: 3,
                title: "Voyage au centre de la Terre",
                author: "Jules Verne"
            })])
        expect(fetch).toHaveBeenCalledWith(`https://api.library.example/books`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

    });
    it("called with fetch library.", async () => {
        try {
            fetch.mockResolvedValue(Promise.reject(new Error("Issue with fetch")));
            await book_list()
            throw new Error("Should have reject with an error but it did not.");
        } catch (err) {
            expect(err.message).toBe(`Error fetching book: Issue with fetch`);
        }
    });
});