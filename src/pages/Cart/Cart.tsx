import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TypeRootState } from '../../store/store';
import { PREFIX } from '../../helpers/API';
import IProduct from '../../interfaces/Product.interface';
import Headling from '../../components/Headling/Headling';
import CartItem from '../../components/CartItem/CartItem';
import axios from 'axios';

const Cart = () => {
   const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
   const items = useSelector((s: TypeRootState) => s.cart.items);

   const getItem = async (id: number) => {
      const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
      return data;
   };

   const loadAllItems = async () => {
      const res = await Promise.all(items.map((i) => getItem(i.id)));
      setCartProducts(res);
   };

   useEffect(() => {
      loadAllItems();
   }, [items]);

   return (
      <>
         <Headling>Корзина</Headling>
         {items.map((i) => {
            const product = cartProducts.find((p) => p.id === i.id);
            if (!product) {
               return;
            }
            return <CartItem count={i.count} {...product} />;
         })}
      </>
   );
};

export default Cart;
