import {
  ordersSlice,
  getUserOrders,
  getOrderByNumber,
  ordersInitialState
} from '@slices';

describe('ordersSlice reducer', () => {
  const mockOrders = [
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
  ];

  it('sets status=true on getUserOrders.pending', () => {
    const action = { type: getUserOrders.pending.type };
    const state = ordersSlice.reducer(ordersInitialState, action);
    expect(state.status).toBe(true);
  });

  it('sets orders and status=false on getUserOrders.fulfilled', () => {
    const action = {
      type: getUserOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = ordersSlice.reducer(ordersInitialState, action);
    expect(state.orders).toEqual(mockOrders);
    expect(state.status).toBe(false);
  });

  it('sets orderData on getOrderByNumber.fulfilled', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [mockOrders[0]] }
    };
    const state = ordersSlice.reducer(ordersInitialState, action);
    expect(state.orderData).toEqual(mockOrders[0]);
  });
});
