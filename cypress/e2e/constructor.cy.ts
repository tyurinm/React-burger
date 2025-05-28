import { INGREDIENTS, SELECTORS } from '../support/constants';

describe('Burger Constructor Flow', () => {
  context('Unauthenticated User', () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('loadIngredients');
      cy.visit('/');
      cy.wait('@loadIngredients');
    });

    describe('Ingredient Addition', () => {
      beforeEach(() => {
        cy.addAllIngredients();
      });

      it('should correctly display all added ingredients with price', () => {
        cy.contains('Оформить заказ')
          .parents('section')
          .first()
          .within(() => {
            cy.contains(INGREDIENTS.MAIN).should('exist');
            cy.contains(INGREDIENTS.SAUCE).should('exist');
            cy.contains(INGREDIENTS.BUN).should('exist');
            cy.contains('5598').should('exist');
          });
      });

      it('should clear constructor leaving only bun', () => {
        cy.contains('Оформить заказ')
          .parents('section')
          .first()
          .within(() => {
            cy.clearConstructorExceptBun();
            cy.contains(INGREDIENTS.BUN).should('exist');
            cy.contains('2510').should('exist');
          });
      });

      describe('Ingredient Modal Behavior', () => {
        beforeEach(() => {
          cy.contains(INGREDIENTS.MAIN).parent().click();
        });

        it('should open ingredient modal', () => {
          cy.get(SELECTORS.MODAL).should('contain', INGREDIENTS.MAIN);
        });

        it('should close modal via close button', () => {
          cy.get(SELECTORS.MODAL_CLOSE).click();
          cy.get(SELECTORS.MODAL).should('not.exist');
        });

        it('should close modal via overlay click', () => {
          cy.get(SELECTORS.MODAL_OVERLAY).click({ force: true });
          cy.get(SELECTORS.MODAL).should('not.exist');
        });
      });
    });
  });

  context('Authenticated Order Creation', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'testAccess');
      cy.window().then((win) => {
        win.localStorage.setItem('refreshToken', 'testRefresh');
      });

      cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('fetchUser');
      cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('loadIngredients');

      cy.visit('/');
      cy.wait(['@fetchUser', '@loadIngredients']);
    });

    it('should create order successfully', () => {
      cy.intercept('POST', '/api/orders', {
        fixture: 'order.json',
        delay: 100
      }).as('submitOrder');

      cy.addIngredientByName(INGREDIENTS.BUN);
      cy.addIngredientByName(INGREDIENTS.MAIN);

      cy.contains('Оформить заказ').click();

      cy.contains('Оформляем заказ...').should('exist');

      cy.wait('@submitOrder').then(() => {
        cy.get(SELECTORS.MODAL).should('contain', '78349');
        cy.get(SELECTORS.MODAL_CLOSE).click();
        cy.get(SELECTORS.MODAL).should('not.exist');

        cy.contains('Выберите булки').should('exist');
        cy.contains('Выберите начинку').should('exist');
        cy.contains('Оформить заказ').parent().contains('0').should('exist');
      });
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      cy.window().then((win) => {
        win.localStorage.removeItem('refreshToken');
      });
    });
  });
});
