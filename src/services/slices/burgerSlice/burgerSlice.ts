import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { RootState } from '@store';
import { orderBurgerApi } from '@api';

export const orderBurger = createAsyncThunk(
  'orders/orderBurger',
  orderBurgerApi
);

type BurgerState = {
  bun?: TConstructorIngredient;
  ingredients: TConstructorIngredient[];
  status: boolean;
  burger: TOrder | null;
};

export const burgerInitialState: BurgerState = {
  bun: undefined,
  ingredients: [],
  status: false,
  burger: null
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState: burgerInitialState,
  selectors: {
    selectOrder: (state) => ({
      bun: state.bun,
      ingredients: state.ingredients
    }),
    selectBurger: (state) => state.burger,
    selectOrderStatus: (state) => state.status
  },
  reducers: {
    removeAll(state) {
      state.burger = null;
      state.status = false;
      state.bun = undefined;
      state.ingredients = [];
    },
    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare(ingredient: TIngredient) {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      if (action.payload.type === 'bun') return;
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    moveDown(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        [state.ingredients[index], state.ingredients[index + 1]] = [
          state.ingredients[index + 1],
          state.ingredients[index]
        ];
      }
    },
    moveUp(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index > 0) {
        [state.ingredients[index], state.ingredients[index - 1]] = [
          state.ingredients[index - 1],
          state.ingredients[index]
        ];
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.status = true;
      })
      .addCase(orderBurger.fulfilled, (state, { payload }) => {
        state.burger = payload.order;
        state.status = false;
      });
  }
});

export const { removeAll, addIngredient, removeIngredient, moveDown, moveUp } =
  burgerSlice.actions;

export const { selectOrder, selectOrderStatus, selectBurger } =
  burgerSlice.getSelectors((state: RootState) => state.burger);
