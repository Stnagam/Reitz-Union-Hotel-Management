// import { cyan } from "@mui/material/colors";

describe("Test", function () {
  it("booking", function () {
    cy.visit("http://localhost:3000/booking");
    cy.viewport("macbook-15");

    cy.get('input[name="checkin"]').type(date);
    cy.get('input[name="checkout"]').type(date1);
    cy.get('#adults').select("3");
    cy.get('#children').select("1");
    cy.get("button").contains("Select Rooms").click();
    cy.get('input[name="zip"]')
   
  });

  

  const date = "2022-05-10";
  const date1 = "2022-05-14";

  });
