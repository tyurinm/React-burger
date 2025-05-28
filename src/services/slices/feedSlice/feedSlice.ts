import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';
import { RootState } from '@store';

type FeedState = {
  feeds: TOrdersData;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

const initialState: FeedState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  status: 'idle'
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
      .addCase(getFeed.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.feeds = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error) {
          console.error('getFeed rejected:', action.error.message);
        }
      });
  }
});

export const selectFeedOrders = (state: RootState) => state.feed.feeds.orders;
export const selectFeedTotal = (state: RootState) => state.feed.feeds.total;
export const selectFeedTotalToday = (state: RootState) =>
  state.feed.feeds.totalToday;
export const selectFeedStatus = (state: RootState) => state.feed.status;

export { initialState as feedInitialState };
