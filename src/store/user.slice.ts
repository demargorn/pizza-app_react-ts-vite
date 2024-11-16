import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserSlice from '../interfaces/UserSlice.interface';

const initialState: UserSlice = {
   jwt: null,
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

export { userActions };
export default userSlice.reducer;
