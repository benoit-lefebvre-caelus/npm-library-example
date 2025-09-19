import Book from "../../../src/objects/Book";
import Library from "../../../src/objects/Library";

describe("<class> Library", () => {
    test("Creation and basic tests", () => {
        const library = new Library({
            id_library: 2,
            books: [
                new Book({
                    id_book: 2,
                    title: "Harry Potter",
                    author: "JKR"
                })
            ]
        });
        expect(library.toJSON()).toEqual({
            id_library: 2,
            books: [
                {
                    id_book: 2,
                    title: "Harry Potter",
                    author: "JKR"
                }
            ]
        });
        library.id_library = 3;
        library.books = [
            {
                id_book: 3,
                title: "Voyage au centre de la Terre",
                author: "Jules Verne"
            }
        ];
        expect(library.id_library).toBe(3);
        expect(library.books).toEqual([
            {
                id_book: 3,
                title: "Voyage au centre de la Terre",
                author: "Jules Verne"
            }
        ]);
    });
    test("Add and remove book", () => {
        const library = new Library({
            id_library: 2,
            books: [
                new Book({
                    id_book: 2,
                    title: "Harry Potter",
                    author: "JKR"
                })
            ]
        });
        expect(library.toJSON()).toEqual({
            id_library: 2,
            books: [
                {
                    id_book: 2,
                    title: "Harry Potter",
                    author: "JKR"
                }
            ]
        });
        library.addBook(new Book({
            id_book: 3,
            title: "Voyage au centre de la Terre",
            author: "Jules Verne"
        }));
        expect(library.toJSON()).toEqual({
            id_library: 2,
            books: [
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
        });
        library.removeBook(new Book({
            id_book: 2
        }));
        expect(library.toJSON()).toEqual({
            id_library: 2,
            books: [
                {
                    id_book: 3,
                    title: "Voyage au centre de la Terre",
                    author: "Jules Verne"
                }
            ]
        });

    });
});