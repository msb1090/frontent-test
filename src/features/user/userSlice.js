/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import request, { updateAuthToken } from '../../app/api/request';

const USER_SLICE_NAME = 'user';
export const STATUS = {
  PENDING: 'PENDING',
  IDLE: 'IDLE',
  ERROR: 'ERROR',
};

const initialState = {
  status: '',
  apiToken: '',
  user: {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
  },
  error: '',
};

export const registerUser = createAsyncThunk(
  `${USER_SLICE_NAME}/registerUser`,
  async (userData) => {
    const response = await request.post('/register', userData);
    if (response.data.error) {
      return Promise.reject(new Error(response.data.error));
    }
    return response;
  },
);

export const loginUser = createAsyncThunk(
  `${USER_SLICE_NAME}/loginUser`,
  async (a, { getState }) => {
    const userData = getState()[USER_SLICE_NAME].user;
    const response = await request.post('/login', {
      email: userData.email,
      password: userData.password,
    });
    const { data: { token } = {} } = response;
    if (token) {
      updateAuthToken(token);
    }

    return response;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetStatus: (state) => {
      state.status = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(registerUser.rejected, (state, action) => {
        const {
          payload: { data = {} } = {},
          error: { message },
        } = action;
        state.status = STATUS.ERROR;
        state.error = message || data.error;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const {
          payload: { data },
        } = action;
        if (data.user) {
          state.user.id = data.user;
          state.status = STATUS.IDLE;
        } else if (data.error) {
          state.status = STATUS.ERROR;
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(loginUser.rejected, (state, action) => {
        const {
          payload: { data = {} } = {},
          error: { message },
        } = action;
        state.status = STATUS.ERROR;
        state.error = message || data.error;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const {
          payload: { data },
        } = action;
        if (data.user) {
          state.apiToken = data.token;
          state.status = STATUS.IDLE;
        } else if (data.error) {
          state.status = STATUS.ERROR;
        }
      });
  },
});

export const { setUser, resetStatus } = userSlice.actions;

export const selectStatus = (state) => state[USER_SLICE_NAME].status;
export const selectError = (state) => state[USER_SLICE_NAME].error;

export const selectUser = (state) => state[USER_SLICE_NAME].user;

export const selectToken = (state) => state[USER_SLICE_NAME].apiToken;

export default userSlice.reducer;
