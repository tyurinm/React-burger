import { feedSlice, getFeed, feedInitialState } from '@slices';

describe('feedSlice reducer', () => {
  const mockPayload = {
    orders: [
      {
        _id: '1',
        name: 'Краторный метеоритный бургер',
        status: 'done',
        number: 1
      },
      {
        _id: '2',
        name: 'Space флюоресцентный бургер',
        status: 'in-progress',
        number: 2
      }
    ],
    total: 4,
    totalToday: 3
  };

  it('should handle fulfilled state', () => {
    const action = { type: getFeed.fulfilled.type, payload: mockPayload };
    const state = feedSlice.reducer(feedInitialState, action);

    expect(state.feeds).toEqual(mockPayload);
  });

  it('should handle rejected state and keep feeds unchanged', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const action = {
      type: getFeed.rejected.type,
      error: { message: 'Error occurred' }
    };
    const state = feedSlice.reducer(feedInitialState, action);

    expect(state.feeds).toEqual(feedInitialState.feeds);
    expect(spy).toHaveBeenCalledWith('getFeed rejected:', 'Error occurred');
    spy.mockRestore();
  });
});
