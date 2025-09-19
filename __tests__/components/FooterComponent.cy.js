import React from "react";
import FooterComponent from "../../src/components/FooterComponent";

describe("FooterComponent", () => {
    it("renders footer text correctly", () => {
        cy.mount(<FooterComponent />);

        cy.get("p").should("have.text", "enterprise @2025");
    });

    it("applies custom class name", () => {
        cy.mount(<FooterComponent customClassName="my-footer" />);

        cy.get("div").should("have.class", "my-footer");
    });
});
