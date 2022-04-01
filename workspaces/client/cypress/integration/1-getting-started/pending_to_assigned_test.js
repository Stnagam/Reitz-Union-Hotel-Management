describe('Test', function () {
  it('pendingToAssigned', function () {
    cy.visit('http://localhost:3000/');
    cy.viewport('macbook-15');
    cy.get('button').contains('Admin Login').click();
    cy.get('input[name="username"]').type('info@ruhm.com');
    cy.get('input[name="password"]').type('123456789');
    cy.get('button').contains('Login').click();
    cy.get('input[name="employee"]').type('Sam');
    cy.get('button').contains('Assign work').click();
    cy.get('button[name="assigned"]').contains('Assigned Request').click();
  });
});
