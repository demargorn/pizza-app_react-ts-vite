import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ICartState from '../interfaces/CartState.interface';

const initialState: ICartState = {
   items: [],
};

const cartSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      // прибавляем количество элементов в корзине
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
      //  убавляем количество элементов в корзине
      remove: (state, action: PayloadAction<number>) => {
         const existed = state.items.find((i) => i.id === action.payload);
         if (!existed) {
            return;
         }
         if (existed.count === 1) {
            state.items = state.items.filter((i) => i.id !== action.payload);
         } else {
            state.items.map((i) => {
               if (i.id === action.payload) {
                  i.count -= 1;
               }
               return i;
            });
            return;
         }
      },
      // удаляем элемент из корзины
      delete: (state, action: PayloadAction<number>) => {
         state.items = state.items.filter((i) => i.id !== action.payload);
      },
   },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
