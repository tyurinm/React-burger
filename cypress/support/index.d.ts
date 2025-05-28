declare namespace Cypress {
  interface Chainable<Subject = any> {
    addIngredientByName(name: string): Chainable<void>;
    addAllIngredients(): Chainable<void>;
    clearConstructorExceptBun(): Chainable<void>;
  }
}
