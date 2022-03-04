// import { cyan } from "@mui/material/colors";

describe("Test", function () {
  it("payment", function () {
    cy.visit("http://localhost:3000/");
    cy.viewport("macbook-15");
    cy.get("button").contains("Login").click();
    cy.get('input[name="username"]').type(name());

    cy.get('input[name="password"]').type(pass(8));

    cy.get("button").contains("Login").click();
    
    cy.get("#button").contains("Make A Reservation").click();
   
    cy.get('input[name="checkin"]').type(date);
    cy.get('input[name="checkout"]').type(date1);
    cy.get("#adults").select("3");
    cy.get("#children").select("1");
    cy.get("button").contains("Select Rooms").click();

    cy.get('input[name="cardnum"]').type("111" + numberGen(5));
    cy.get('input[name="zip"]').type(numberGen(5));
    cy.get("#year").select("2022");
    cy.get("#month").select("Mar");
    cy.get('input[name="cvv"]').type(numberGen(3));
    cy.get("button").contains("Make a Payment").click();
  });

  // d1.getDate()+'-'+d1.getMonth()+'-'+d1.getFullYear())
  const date = "2022-05-10";
  const date1 = "2022-05-14";

  function name() {
    var text = "he.patel@ufl.edu";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // for(var i = 0; i < 5; i++){
    //     text += possible.charAt(Math.floor(Math.random()*possible.length));
    // }
    return text;
  }

  function pass(i) {
    const pass = "12345678";
    var password = "";
    for (var j = 0; j < i; j++) {
      password += pass.charAt(Math.floor(Math.random() * pass.length));
    }
    return pass;
  }
  function numberGen(i) {
    var num = "";
    var possible = "1234567890";
    for (var j = 0; j < i; j++) {
      num += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return num;
  }
});
