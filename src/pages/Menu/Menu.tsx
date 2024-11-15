import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { PREFIX } from '../../helpers/API';
import IProduct from '../../interfaces/Product.interface';
import MenuList from './MenuList/MenuList';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';

const Menu = () => {
   const [products, setProducts] = useState<IProduct[]>([]); // состояние списка продуктов
   const [isLoading, setIsLoading] = useState<boolean>(false); // состояние загрузки
   const [error, setError] = useState<string | undefined>(); // состояние ошибки загрузки

   // async fn загрузки списка продуктов
   const getMenu = async () => {
      try {
         setIsLoading(true); // начинаем загрузку
         const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`);
         setProducts(data);
         setIsLoading(false); // прекращаем загрузку
      } catch (error) {
         // проверяем тип ошибки
         if (error instanceof AxiosError) {
            setError(error.message);
         }
         setIsLoading(false); // в случае ошибки прекращаем загрузку
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
            {/* показываем сообщение об ошибке в случае ошибки из axios */}
            {error && <>{error}</>}
            {/* показываем список продуктов после загрузки */}
            {!isLoading && <MenuList products={products} />}
            {/* показываем заголовок загрузки продуктов */}
            {isLoading && <>Загружаем список продуктов...</>}
         </div>
      </>
   );
};

export default Menu;
