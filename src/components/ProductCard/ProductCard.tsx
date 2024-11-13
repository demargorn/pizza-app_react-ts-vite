import IProductCardProps from './ProductCard.props';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';

const ProductCard = (props: IProductCardProps) => {
   return (
      <Link to={'/'} className={styles['link']}>
         <div className={styles['card']}>
            <div className={styles['header']} style={{ backgroundImage: `url(${props.image})` }}>
               <div className={styles['price']}>
                  {props.price}&nbsp;
                  <span className={styles['currency']}>₽</span>
               </div>
               <button className={styles['add-to-cart']}>
                  <img src='/add-to-cart.svg' alt='добавить в корзину' />
               </button>
               <div className={styles['rating']}>
                  {props.rating}&nbsp;
                  <img src='/star.svg' alt='иконка звездочки' />
               </div>
            </div>
            <div className={styles['footer']}>
               <div className={styles['title']}>{props.title}</div>
               <div className={styles['description']}>{props.description}</div>
            </div>
         </div>
      </Link>
   );
};

export default ProductCard;
