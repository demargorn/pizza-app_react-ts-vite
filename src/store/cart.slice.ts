import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ICartState from '../interfaces/CartState.interface';

const initialState: ICartState = {
   items: [],
};

const cartSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      // добавляем новый элемент в корзину
      add: (state, action: PayloadAction<number>) => {
         const existed = state.items.find((i) => i.id === action.payload);
         // если не существует - добавляем новый
         if (!existed) {
            state.items.push({ id: action.payload, count: 1 });
            return;
         }
         // если существует - находим и добавляем единицу
         state.items.map((i) => {
            if (i.id === action.payload) {
               i.count += 1;
            }
            return i;
         });
      },
   },
   extraReducers: (builder) => {},
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
