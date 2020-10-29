describe('Authentication page', () => {
  it('successfully redirects to auth page', () => {
    cy.visit('/');
    cy.url().should('include', '/auth');
  });
});

describe('Register', () => {
  beforeEach(() => {
    cy.visit('/auth');
    cy.get('#switchMode').click();
  });

  it('Register fails with no valid email', () => {
    cy.get('#email').type('invalidEmail');
    cy.get('#password').type('123456');
    cy.get('#submitAuth').should('be.disabled');
  });

  it('Register fails with no valid password', () => {
    cy.get('#email').type('testUser@test.com');
    cy.get('#password').type('123');
    cy.get('#submitAuth').should('be.disabled');
  });
});

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/auth');
  });

  afterEach(() => {
    cy.clearLocalStorage();
  })

  it('Login fails with no valid email', () => {
    cy.get('#email').type('invalidEmail');
    cy.get('#password').type('123456');
    cy.get('#submitAuth').should('be.disabled');
  });

  it('Login fails with no valid password', () => {
    cy.get('#email').type('testUser@test.com');
    cy.get('#password').type('123');
    cy.get('#submitAuth').should('be.disabled');
  });

  it('Login fails with wrong credentials', () => {
    const fakeEmail = 'email' + Math.random().toString(36).substring(10) + '@test.com';
    const fakePass = 'password' + Math.random().toString(36).substring(10);

    cy.get('#email').type(fakeEmail);
    cy.get('#password').type(fakePass);
    cy.get('#submitAuth').click();

    cy.get('.alert-box').should('exist');
    cy.url().should('include', '/auth');
  });

  it('Login succeeds with correct credentials', () => {
    cy.get('#email').type(Cypress.config('loginEmail'));
    cy.get('#password').type(Cypress.config('loginPassword'));
    cy.get('#submitAuth').click();

    cy.url().should('include', '/recipes');
    cy.get('a[routerlink="auth"]').should('not.exist');
  });

  it('Logout succeeds after logging in', () => {
    cy.get('#email').type(Cypress.config('loginEmail'));
    cy.get('#password').type(Cypress.config('loginPassword'));
    cy.get('#submitAuth').click();

    cy.url().should('include', '/recipes');

    cy.get('a').contains('Logout').click();

    cy.url().should('include', '/auth');
  });
});
