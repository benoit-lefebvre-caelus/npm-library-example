import React from "react";
import ToolBarComponent from "../../src/components/ToolBarComponent";

describe("ToolBarComponent", () => {
  it("renders toolbar text correctly", () => {
    cy.mount(<ToolBarComponent />);

    // directly check the h1 text
    cy.get("h1").should("have.text", "Here is the toolbar");
  });

  it("applies custom class name", () => {
    cy.mount(<ToolBarComponent customClassName="my-toolbar" />);

    cy.get("div").should("have.class", "my-toolbar");
  });
});