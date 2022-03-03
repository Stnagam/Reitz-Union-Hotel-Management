// import { cyan } from "@mui/material/colors";

describe('Test', function(){

    it('sign up', function(){

        cy.visit('http://localhost:3000/Signup');
        cy.viewport('macbook-15');
        // cy.get('a').contains('Signup').click();
        cy.get('input[name="firstname"]').type(name());
         cy.get('input[name="lastname"]').type(name());
        cy.get('input[name="email"]').type(name()+'@gmail.com');
        cy.get('input[name="password"]').type(pass(8));
        cy.get('input[name="password1"]').type(pass(8));
        cy.get('input[name="mobile"]').type('1'+numberGen(9));
        cy.get('input[name="age"]').type(numberGen(2));
        cy.get('button').contains('Register').click();
        cy.get('a').contains('Forgot').should('have.text', 'Login');


    });

    function pass(i){
        const pass = "123";
        var password = "";
         for(var j = 0; j < i; j++){
            password += pass.charAt(Math.floor(Math.random()*pass.length));
        }
        return password;
    }

    function numberGen(i){
        var num = "";
        var possible = "1234567890";
        for(var j = 0; j < i; j++){
            num += possible.charAt(Math.floor(Math.random()*possible.length));
        }
        return num;
    }

    function name(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for(var i = 0; i < 5; i++){
            text += possible.charAt(Math.floor(Math.random()*possible.length));
        }
        return text;
    }

});