import Book from "../objects/Book";

/**
 * Get a specific book's informations.
 * @param {*} props {id_book: number}
 * @return Book {}
 */
export const book_get = async (
  props = {
    id_book: undefined
  }
) => {
  if (!props.id_book)
    throw new Error(
      `id_book parameter is required to get a specific book.`
    );

  return await Promise.resolve(
    fetch(`https://api.library.example/book?id_book=${props.id_book}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
  )
    .then(async (result) => await result.json())
    .then((book) => {
      return new Book({
        id_book: book.id_book,
        title: book.title,
        author: book.author
      });
    })
    .catch((error) => {
      throw new Error(`Error fetching book: ${error.message}`);
    });
};

/**
 * Get all the books in database.
 * @return [Book {}]
 */
export const book_list = async () => {
  return await Promise.resolve(
    fetch(`https://api.library.example/books`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
  )
    .then(async (result) => await result.json())
    .then((books) => {
      return books.map((book) => new Book({
        id_book: book.id_book,
        title: book.title,
        author: book.author
      }));
    })
    .catch((error) => {
      throw new Error(`Error fetching book: ${error.message}`);
    });
};