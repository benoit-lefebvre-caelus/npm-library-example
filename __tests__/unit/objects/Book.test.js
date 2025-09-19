import Book from "../../../src/objects/Book";

describe("<class> Book", () => {
  test("Creation and basic tests", () => {
    const book = new Book({ 
        id_book: 2, 
        title: "Harry potter", 
        author: "JKR" 
    });
    expect(book.toJSON()).toEqual({ 
        "id_book": 2, 
        "title": "Harry potter", 
        "author": "JKR" 
    });
    book.id_book = 3;
    book.title = "Voyage au centre de la Terre";
    book.author = "Jules Verne";
    expect(book.id_book).toBe(3);
    expect(book.title).toBe("Voyage au centre de la Terre");
    expect(book.author).toBe("Jules Verne");
  });
});