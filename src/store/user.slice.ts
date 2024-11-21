import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUserPersistentState from '../interfaces/UserPersistentState';
import UserSlice from '../interfaces/UserSlice.interface';
import { loadState } from './storage';

const JWT_PERSISTENT_STATE = 'userData';

const initialState: UserSlice = {
   jwt: loadState<IUserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null, // загружаем при загрузке из local starage
};
const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      addJwt: (state, action: PayloadAction<string>) => {
         state.jwt = action.payload;
      },
      logOut: (state) => {
         state.jwt = null;
      },
   },
});

const userActions = userSlice.actions; // для изменения состояния

export { userActions, JWT_PERSISTENT_STATE };
export default userSlice.reducer;
