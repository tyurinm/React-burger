import {
  ingredientsSlice,
  getIngredients,
  ingredientsInitialState
} from '@slices';
import { TIngredient } from '@utils-types';

const testBun: TIngredient = {
  _id: '1',
  name: 'Краторная булка',
  type: 'bun',
  proteins: 10,
  fat: 20,
  carbohydrates: 30,
  calories: 300,
  price: 100,
  image: 'image.png',
  image_mobile: 'image_mobile.png',
  image_large: 'image_large.png'
};

const testSauce: TIngredient = {
  _id: '2',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 5,
  fat: 10,
  carbohydrates: 15,
  calories: 150,
  price: 50,
  image: 'image2.png',
  image_mobile: 'image_mobile2.png',
  image_large: 'image_large2.png'
};

describe('ingredientsSlice reducer', () => {
  describe('async reducers', () => {
    it('should handle getIngredients.pending', () => {
      const action = { type: getIngredients.pending.type };
      const newState = ingredientsSlice.reducer(
        ingredientsInitialState,
        action
      );

      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
      expect(newState.ingredients).toHaveLength(0);
    });

    it('should handle getIngredients.fulfilled', () => {
      const payload = [testBun, testSauce];
      const action = {
        type: getIngredients.fulfilled.type,
        payload
      };

      const newState = ingredientsSlice.reducer(
        ingredientsInitialState,
        action
      );

      expect(newState.loading).toBe(false);
      expect(newState.error).toBeNull();
      expect(newState.ingredients).toEqual(payload);
    });

    it('should handle getIngredients.rejected', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const action = {
        type: getIngredients.rejected.type,
        error: { message: 'Failed to fetch' }
      };

      const newState = ingredientsSlice.reducer(
        ingredientsInitialState,
        action
      );

      expect(newState.loading).toBe(false);
      expect(newState.error).toBe('Failed to fetch');
      expect(newState.ingredients).toHaveLength(0);
      expect(spy).toHaveBeenCalledWith('getIngredients rejected:', 'Failed to fetch');

      spy.mockRestore();
    });
  });
});
