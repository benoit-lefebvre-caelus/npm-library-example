import React from "react";
import PropTypes from "prop-types";
import Library from "../objects/Library";
import BookComponent from "./BookComponent.jsx";

/**
 * Library component to display library details in a table row.
 * @param {*} param0 
 * @returns 
 */
function LibraryComponent({
  customClassName = "",
  library = new Library()
}) {
  return (
    <table className={customClassName}>
      <caption>
        List of Books in the Library
      </caption>
      <thead>
        <tr>
          <th scope="col">id_book</th>
          <th scope="col">title</th>
          <th scope="col">author</th>
        </tr>
      </thead>
      <tbody>
        {library.books.map((book) => (
          <BookComponent key={book.id_book} book={book} />))}
      </tbody>
    </table>
  );
}
LibraryComponent.propTypes = {
  customClassName: PropTypes.string,
  library: PropTypes.instanceOf(Library),
};
export default LibraryComponent;
