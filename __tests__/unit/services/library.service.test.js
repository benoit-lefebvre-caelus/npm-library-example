import { beforeEach, expect, jest } from "@jest/globals";
import { library_get } from "../../../src/services/library.service";
import Library from "../../../src/objects/Library";
import Book from "../../../src/objects/Book";

describe("library.service.library_get()", () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        jest.clearAllMocks();
    });
    it("Get the library from id.", async () => {
        fetch.mockResolvedValue(Promise.resolve({
            json: async () => {
                return {
                    id_library: 3,
                    books: [
                        {
                            id_book: 2,
                            title: "Harry Potter",
                            author: "JKR"
                        }
                    ]
                }
            }
        }));

        const result = await library_get(
            {
                id_library: 3
            },
        );
        expect(result).toEqual(new Library({
            id_library: 3,
            books: [
                new Book({
                    id_book: 2,
                    title: "Harry Potter",
                    author: "JKR"
                })
            ]
        }))
        expect(fetch).toHaveBeenCalledWith(`https://api.library.example/library?id_library=3`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    });
    it("called without id_library and should reject with an error.", async () => {
        try {
            await library_get()
            throw new Error("Should have reject with an error but it did not.");
        } catch (err) {
            expect(err.message).toBe(`id_library parameter is required to get a specific library.`);
        }
    });
    it("called with fetch library.", async () => {
        try {
            fetch.mockResolvedValue(Promise.reject(new Error("Issue with fetch")));
            await library_get({ id_library: 1 })
            throw new Error("Should have reject with an error but it did not.");
        } catch (err) {
            expect(err.message).toBe(`Error fetching library: Issue with fetch`);
        }
    });
});