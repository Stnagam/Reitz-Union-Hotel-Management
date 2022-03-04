// import { cyan } from "@mui/material/colors";

describe('Test', function(){

    it('login', function(){

        cy.visit('http://localhost:3000/');
        cy.viewport('macbook-15');
        cy.get('button').contains('Login').click();
        cy.get('input[name="username"]').type(name());
       
        cy.get('input[name="password"]').type(pass(8));
        
        cy.get('button').contains('Login').click();
        // cy.get('a').contains('Forgot Password?').should('have.text', 'Forgot Password?');
        // cy.get('input[name="username"]');
        // cy.get('label').contains("Checkin Date");


    });

    function pass(i){
        const pass = "12345678";
        var password = "";
         for(var j = 0; j < i; j++){
            password += pass.charAt(Math.floor(Math.random()*pass.length));
        }
        return pass;
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
        var text = "he.patel@ufl.edu";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        // for(var i = 0; i < 5; i++){
        //     text += possible.charAt(Math.floor(Math.random()*possible.length));
        // }
        return text;
    }

});