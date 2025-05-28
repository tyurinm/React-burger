import { INGREDIENTS } from './constants';

Cypress.Commands.add('addIngredientByName', (name: string) => {
  cy.contains(name).parent().find('button').click();
});

Cypress.Commands.add('addAllIngredients', () => {
  Object.values(INGREDIENTS).forEach((item) => {
    cy.addIngredientByName(item);
  });
});

Cypress.Commands.add('clearConstructorExceptBun', () => {
  [INGREDIENTS.MAIN, INGREDIENTS.SAUCE].forEach((item) => {
    cy.contains(item)
      .parent()
      .find('.constructor-element__action')
      .click();
  });
});