import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { RootState } from '@store';

type IngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const ingredientsInitialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredientsSlice',
  initialState: ingredientsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.ingredients = payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
        console.error('getIngredients rejected:', action.error?.message);
      });
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsStatus: (state) => state.loading,
    selectBuns: (state) => state.ingredients.filter((i) => i.type === 'bun'),
    selectMains: (state) => state.ingredients.filter((i) => i.type === 'main'),
    selectSauces: (state) =>
      state.ingredients.filter((i) => i.type === 'sauce'),
    selectIngredientById: (state, id: string) =>
      state.ingredients.find((i) => i._id === id)
  }
});

export const {
  selectIngredients,
  selectIngredientsStatus,
  selectBuns,
  selectMains,
  selectSauces,
  selectIngredientById
} = ingredientsSlice.getSelectors((state: RootState) => state.ingredients);
