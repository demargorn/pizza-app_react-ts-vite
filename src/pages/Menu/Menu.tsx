import { useEffect, useState } from 'react';
import { PREFIX } from '../../helpers/API';
import IProduct from '../../interfaces/product.interface';
import Headling from '../../components/Headling/Headling';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';

const Menu = () => {
   const [products, setProducts] = useState<IProduct[]>([]);

   const getMenu = async () => {
      try {
         const res = await fetch(`${PREFIX}/products`);
         if (!res.ok) {
            return;
         }
         const data = (await res.json()) as IProduct[];
         setProducts(data);
      } catch (error) {
         console.log(error);
         return;
      }
   };

   useEffect(() => {
      getMenu();
   }, []);

   return (
      <>
         <div className={styles['head']}>
            <Headling>Меню</Headling>
            <Search placeholder='Введите блюдо или состав' />
         </div>
         <div>
            {products.map((product) => (
               <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  ingredients={product.ingredients.join(', ')}
                  image={product.image}
                  rating={product.rating}
               />
            ))}
         </div>
      </>
   );
};

export default Menu;
