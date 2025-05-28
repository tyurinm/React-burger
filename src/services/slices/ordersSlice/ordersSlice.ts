import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';
import { RootState } from '@store';

export const getUserOrders = createAsyncThunk('orders/getOrders', getOrdersApi);

export const getOrderByNumber = createAsyncThunk(
  'orders/getByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

type OrdersState = {
  status: boolean;
  orders: TOrder[];
  orderData?: TOrder;
};

export const ordersInitialState: OrdersState = {
  status: false,
  orders: []
};

export const ordersSlice = createSlice({
  name: 'ordersSlice',
  initialState: ordersInitialState,
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrdersStatus: (state) => state.status,
    selectOrderByNumber: (state) => state.orderData
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.status = true;
      })
      .addCase(getUserOrders.fulfilled, (state, { payload }) => {
        state.orders = payload;
        state.status = false;
      })
      .addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
        state.orderData = payload.orders[0];
      });
  }
});

export const { selectOrders, selectOrdersStatus, selectOrderByNumber } =
  ordersSlice.getSelectors((state: RootState) => state.orders);
