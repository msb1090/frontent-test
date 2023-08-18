import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/features/user/userSlice';
import applicationReducer from '@/features/application/applicationSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    application: applicationReducer,
  },
  // devTools: false,
});

export default store;
