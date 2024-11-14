import { useLoaderData } from 'react-router-dom';
import IProduct from '../../interfaces/product.interface';
// import styles from './Product.module.css';

const Product = () => {
   const data = useLoaderData() as IProduct; // получаем data посредством хука React.Router

   return <>Product - {data.name}</>;
};

export default Product;
