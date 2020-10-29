// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('realLogin', () => {
  cy.request({
    method: 'POST',
    url: Cypress.config('loginUrl'),
    body: {
      email: Cypress.config('loginEmail'),
      password: Cypress.config('loginPassword'),
      returnSecureToken: true
    }, qs: {
      key:  Cypress.config('apiKey')
    }
  }).then((response) => {
    const expDate = new Date(new Date().getTime() + +response.body['expiresIn'] * 1000);
    const user = {
      email: response.body['email'],
      id: response.body['localId'],
      _token: response.body['idToken'],
      _tokenExpirationDate: expDate
    };
    localStorage.setItem('userData', JSON.stringify(user));
  });
});

Cypress.Commands.add('mockLogin', () => {
  cy.fixture('userData.json').then(userData => {
    userData._tokenExpirationDate = new Date(new Date().getTime() + 3600000);
    localStorage.setItem('userData', JSON.stringify(userData));
  });
});
