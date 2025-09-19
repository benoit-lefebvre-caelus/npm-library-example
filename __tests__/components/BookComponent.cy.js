import React from "react";
import BookComponent from "../../src/components/BookComponent";
import Book from "../../src/objects/Book";

describe("BookComponent", () => {
  it("renders book details correctly", () => {
    const book = new Book({
      id_book: 1,
      title: "Harry Potter",
      author: "J.K. Rowling",
    });

    cy.mount(
      <table>
        <tbody>
          <BookComponent book={book} />
        </tbody>
      </table>
    );

    // check table row content
    cy.get("tr").within(() => {
      cy.get("th").should("have.text", "1");
      cy.get("td").eq(0).should("have.text", "Harry Potter");
      cy.get("td").eq(1).should("have.text", "J.K. Rowling");
    });
  });

  it("applies custom class name", () => {
    const book = new Book({ id_book: 2, title: "Book B", author: "Author B" });

    cy.mount(
      <table>
        <tbody>
          <BookComponent book={book} customClassName="my-class" />
        </tbody>
      </table>
    );

    cy.get("tr").should("have.class", "my-class");
  });
});