import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import IProduct from '../../interfaces/Product.interface';
// import styles from './Product.module.css';

const Product = () => {
   const data = useLoaderData() as { data: IProduct }; // получаем data посредством хука React.Router

   return (
      <>
         <Suspense fallback={'Загружаю...'}>
            <Await resolve={data.data}>
               {({ data }: { data: IProduct }) => <>Product - {data.name}</>}
            </Await>
         </Suspense>
      </>
   );
};

export default Product;
