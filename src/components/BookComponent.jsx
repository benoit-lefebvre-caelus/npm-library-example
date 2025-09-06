import React from "react";
import PropTypes from "prop-types";
import Book from "../objects/Book";

/**
 * Book component to display book details in a table row.
 * @param {*} param0 
 * @returns 
 */
function BookComponent({
  customClassName = "",
  book = new Book()
}) {
  return (
    <tr className={customClassName}>
      <th scope="row">{book.id_book}</th>
      <td>{book.title}</td>
      <td>{book.author}</td>
    </tr>
  );
}
BookComponent.propTypes = {
  customClassName: PropTypes.string,
  book: PropTypes.instanceOf(Book),
};
export default BookComponent;
