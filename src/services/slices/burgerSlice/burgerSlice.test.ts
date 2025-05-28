import { burgerSlice, burgerInitialState } from '@slices';

describe('burgerSlice reducer', () => {
  const bun = {
    _id: '1',
    name: 'Краторная булка',
    type: 'bun',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 300,
    price: 100,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const sauce = {
    _id: '2',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 5,
    fat: 10,
    carbohydrates: 15,
    calories: 150,
    price: 50,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const main = {
    _id: '3',
    name: 'Мясо марсианское',
    type: 'main',
    proteins: 50,
    fat: 40,
    carbohydrates: 30,
    calories: 500,
    price: 300,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  it('should add bun correctly', () => {
    const action = burgerSlice.actions.addIngredient(bun);
    const state = burgerSlice.reducer(burgerInitialState, action);
    expect(state.bun).toMatchObject(bun);
  });

  it('should add sauce to ingredients', () => {
    const action = burgerSlice.actions.addIngredient(sauce);
    const state = burgerSlice.reducer(burgerInitialState, action);
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject(sauce);
  });

  it('should remove sauce by id', () => {
    const added = burgerSlice.actions.addIngredient(sauce);
    const intermediate = burgerSlice.reducer(burgerInitialState, added);
    const toRemove = intermediate.ingredients[0];
    const action = burgerSlice.actions.removeIngredient(toRemove);
    const state = burgerSlice.reducer(intermediate, action);
    expect(state.ingredients).toHaveLength(0);
  });

  it('should not remove bun using removeIngredient', () => {
    const added = burgerSlice.actions.addIngredient(bun);
    const intermediate = burgerSlice.reducer(burgerInitialState, added);
    const action = burgerSlice.actions.removeIngredient(intermediate.bun!);
    const state = burgerSlice.reducer(intermediate, action);
    expect(state.bun).toMatchObject(bun);
  });

  it('should move ingredient down', () => {
    const first = burgerSlice.actions.addIngredient(sauce);
    const second = burgerSlice.actions.addIngredient(main);
    let state = burgerSlice.reducer(burgerInitialState, first);
    state = burgerSlice.reducer(state, second);
    const action = burgerSlice.actions.moveDown(0);
    const result = burgerSlice.reducer(state, action);
    expect(result.ingredients.map((i) => i._id)).toEqual(['3', '2']);
  });

  it('should move ingredient up', () => {
    const first = burgerSlice.actions.addIngredient(sauce);
    const second = burgerSlice.actions.addIngredient(main);
    let state = burgerSlice.reducer(burgerInitialState, first);
    state = burgerSlice.reducer(state, second);
    const action = burgerSlice.actions.moveUp(1);
    const result = burgerSlice.reducer(state, action);
    expect(result.ingredients.map((i) => i._id)).toEqual(['3', '2']);
  });

  it('should reset all on removeAll', () => {
    const prefilled = {
      bun: { ...bun, id: 'some-id' },
      ingredients: [{ ...sauce, id: 'other-id' }],
      status: true,
      burger: { order: { number: 123 } } as any
    };
    const action = burgerSlice.actions.removeAll();
    const state = burgerSlice.reducer(prefilled, action);
    expect(state).toEqual(burgerInitialState);
  });
});
