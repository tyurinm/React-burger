import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';

type FeedState = {
  feeds: TOrdersData;
};

const initialState: FeedState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const getFeed = createAsyncThunk(
  'feed/getAll',
  async () => await getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.fulfilled, (state, action) => {
        state.feeds = action.payload;
      })
      .addCase(getFeed.rejected, (_state, action) => {
        if (action.error) {
          console.error('getFeed rejected:', action.error.message);
        }
      });
  },
  selectors: {
    selectOrders: (state) => state.feeds.orders,
    selectTotal: (state) => state.feeds.total,
    selectTotalToday: (state) => state.feeds.totalToday
  }
});

export const { selectOrders, selectTotal, selectTotalToday } = feedSlice.selectors;
export { initialState as feedInitialState };
