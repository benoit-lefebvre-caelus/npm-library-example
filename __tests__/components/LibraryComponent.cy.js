/// <reference types="cypress" />
import React from "react";
import LibraryComponent from "../../src/components/LibraryComponent";
import Library from "../../src/objects/Library";
import Book from "../../src/objects/Book";

describe("LibraryComponent", () => {
  it("renders library table with books", () => {
    const library = new Library({
      id_library: 1,
      books: [
        new Book({ id_book: 101, title: "Book A", author: "Author A" }),
        new Book({ id_book: 102, title: "Book B", author: "Author B" }),
      ],
    });

    cy.mount(<LibraryComponent library={library} />);

    // check table caption
    cy.get("table caption").should("have.text", "List of Books in the Library");

    // check table headers
    cy.get("table thead th").eq(0).should("have.text", "id_book");
    cy.get("table thead th").eq(1).should("have.text", "title");
    cy.get("table thead th").eq(2).should("have.text", "author");

    // check book rows
    cy.get("tbody tr").should("have.length", 2);

    cy.get("tbody tr").eq(0).within(() => {
      cy.get("th").should("have.text", "101");
      cy.get("td").eq(0).should("have.text", "Book A");
      cy.get("td").eq(1).should("have.text", "Author A");
    });

    cy.get("tbody tr").eq(1).within(() => {
      cy.get("th").should("have.text", "102");
      cy.get("td").eq(0).should("have.text", "Book B");
      cy.get("td").eq(1).should("have.text", "Author B");
    });
  });

  it("applies custom class name to table", () => {
    const library = new Library({ books: [] });
    cy.mount(<LibraryComponent library={library} customClassName="my-library" />);
    cy.get("table").should("have.class", "my-library");
  });
});
