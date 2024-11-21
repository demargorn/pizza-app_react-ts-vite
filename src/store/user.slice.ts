import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../helpers/API';
import { loadState } from './storage';
import IUserPersistentState from '../interfaces/UserPersistentState';
import UserState from '../interfaces/UserState.interface';
import ILoginResponce from '../interfaces/Auth.interface';

const JWT_PERSISTENT_STATE = 'userData';

const initialState: UserState = {
   jwt: loadState<IUserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null, // загружаем при загрузке из local starage
};

const login = createAsyncThunk(
   'user/login',
   async (params: { email: string; password: string }) => {
      try {
         const { data } = await axios.post<ILoginResponce>(`${PREFIX}/auth/login`, {
            email: params.email,
            password: params.password,
         });
         return data;
      } catch (error) {
         if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message);
         }
      }
   }
);

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      logOut: (state) => {
         state.jwt = null;
      },
      clearLoginError: (state) => {
         state.loginErrorMessage = undefined;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(login.fulfilled, (state, action) => {
         if (!action.payload) {
            return;
         }
         state.jwt = action.payload.access_token;
      });
      builder.addCase(login.rejected, (state, action) => {
         state.loginErrorMessage = action.error.message;
      });
   },
});

const userActions = userSlice.actions; // для изменения состояния

export { login, userActions, JWT_PERSISTENT_STATE };
export default userSlice.reducer;
