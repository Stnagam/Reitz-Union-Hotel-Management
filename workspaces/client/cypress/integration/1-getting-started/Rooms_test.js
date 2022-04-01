// import { cyan } from "@mui/material/colors";

describe("Test", function () {
    it("Rooms", function () {
      cy.visit("http://localhost:3000/availablerooms");
      cy.viewport("macbook-15");
  
      cy.get("button").contains("Book Deluxe").click();
      cy.get('input[name="zip"]')
     
    });
  
    });