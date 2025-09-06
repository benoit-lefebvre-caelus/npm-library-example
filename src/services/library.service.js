import Book from "../objects/Book";
import Library from "../objects/Library";

/**
 * Get a specific library's informations.
 * @param {*} props {id_library: number}
 * @return Book {}
 */
export const library_get = async (
  props = {
    id_library: undefined
  }
) => {
  if (!props.id_library)
    throw new Error(
      `id_library parameter is required to get a specific library.`
    );

  return await Promise.resolve(
    fetch(`https://api.library.example/library?id_library=${props.id_library}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
  )
    .then(async (result) => await result.json())
    .then((library) => {
      return new Library({
        id_library: library.id_library,
        books: library.books.map((book) => new Book({
          id_book: book.id_book,
          title: book.title,
          author: book.author
        }))
      })
        .catch((error) => {
          throw new Error(`Error fetching library: ${error.message}`);
        });
    });
}

