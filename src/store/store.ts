import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user.slice';

// создаем хранилище
const store = configureStore({
   reducer: {
      user: userSlice,
   },
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type TypeAppDispatch = typeof store.dispatch;

export default store;
