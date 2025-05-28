import {
  authSlice,
  loginUser,
  registerUser,
  getUser,
  updateUser,
  logout,
  authInitialState
} from '@slices';

describe('authSlice reducer', () => {
  const testUser = {
    email: 'tyurinm@gmail.com',
    name: 'tyurinm'
  };

  it('handles loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user: testUser }
    };

    const state = authSlice.reducer(authInitialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(testUser);
  });

  it('handles registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: testUser }
    };

    const state = authSlice.reducer(authInitialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(testUser);
  });

  it('handles getUser.fulfilled', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: { user: testUser }
    };

    const state = authSlice.reducer(authInitialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(testUser);
  });

  it('handles updateUser.fulfilled', () => {
    const prevUser = {
      email: 'old@email.com',
      name: 'old'
    };

    const updatedUser = {
      email: 'new@n.ew',
      name: 'new'
    };

    const stateWithUser = {
      ...authInitialState,
      isAuth: true,
      user: prevUser
    };

    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: updatedUser }
    };

    const state = authSlice.reducer(stateWithUser, action);

    expect(state.user).toEqual(updatedUser);
  });

  it('handles logout.fulfilled', () => {
    const stateWithUser = {
      ...authInitialState,
      isAuth: true,
      user: testUser
    };

    const action = { type: logout.fulfilled.type };
    const state = authSlice.reducer(stateWithUser, action);

    expect(state.isAuth).toBe(false);
    expect(state.user).toBeUndefined();
  });
});
