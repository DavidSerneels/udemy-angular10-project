describe('Recipe page', () => {
  it('successfully shows recipes page', () => {
    cy.mockLogin();
    cy.visit('/recipes');
    cy.url().should('include', '/recipes');
  });
});

describe('manage recipes', () => {
  beforeEach(() => {
    cy.mockLogin();
    cy.visit('/recipes');
  })

  it('should add a new recipe', () => {
    addTestRecipe();
  });

  it('should edit an existing recipe', () => {
    addTestRecipe();
    cy.get('h4').contains('recipeName1').click();

    cy.get('button').contains('Manage Recipe').click();
    cy.get('a').contains('Edit Recipe').click();

    cy.get('#name').clear().type('anotherRecipeName');
    cy.get('button').contains('Save').click();

    cy.get('h4').contains('recipeName1').should('not.exist');
    cy.get('h4').contains('anotherRecipeName').should('exist');
  });

  it('should delete an existing recipe', () => {
    addTestRecipe();
    cy.get('h4').contains('recipeName1').click();

    cy.get('button').contains('Manage Recipe').click();
    cy.get('a').contains('Delete Recipe').click();

    cy.get('h4').should('not.exist');
  });

  function addTestRecipe() {
    cy.get('button').contains('New Recipe').click();
    cy.url().should('include', '/recipes/new');

    cy.get('#name').type('recipeName1');
    cy.get('#imagePath').type('imagePath1');
    cy.get('#description').type('a description of recipe 1');

    cy.get('button').contains('Save').click();

    cy.get('h4').contains('recipeName1').should('exist');
  }
});
