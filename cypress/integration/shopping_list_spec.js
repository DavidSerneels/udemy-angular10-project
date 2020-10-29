describe('Shopping list page', () => {
  it('successfully shows shopping list page', () => {
    cy.visit('/shopping-list');
    cy.url().should('include', '/shopping-list');
  });
});

describe('manage shopping list', () => {
  beforeEach(() => {
    cy.visit('/shopping-list');
    cy.url().should('include', '/shopping-list');
  })

  it('should add a new ingredient', () => {
    addIngredient('testIngredient', 1);
    cy.contains('testIngredient (1)').should('exist');

    addIngredient('testIngredient2', 500);
    cy.contains('testIngredient (1)').should('exist');
    cy.contains('testIngredient2 (500)').should('exist');
  });

  it('should not add a new ingredient if the fields are empty', () => {
    cy.get('#name').clear();
    cy.get('#amount').clear();
    cy.get('button').contains('Add').should('be.disabled');
  });

  it('should clear a new ingredient without saving', () => {
    cy.get('#name').type('testIngredient');
    cy.get('#amount').type('1');

    cy.get('button').contains('Clear').click();
    cy.contains('testIngredient (1)').should('not.exist');
  });

  it('should edit an existing ingredient', () => {
    addIngredient('testIngredient', 1);
    cy.contains('testIngredient (1)').click();

    cy.get('#amount').clear().type(123);
    cy.get('button').contains('Update').click();

    cy.contains('testIngredient (123)').should('exist');
  });

  it('should delete an existing ingredient', () => {
    addIngredient('testIngredient', 1);
    cy.contains('testIngredient (1)').click();

    cy.get('button').contains('Delete').click();
    cy.contains('testIngredient (123)').should('not.exist');
  });

  function addIngredient(name, amount) {
    cy.get('#name').type(name);
    cy.get('#amount').type(amount);

    cy.get('button').contains('Add').click();
  }
});
