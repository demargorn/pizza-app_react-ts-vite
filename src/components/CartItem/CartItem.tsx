import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
import { TypeAppDispatch } from '../../store/store';
import ICartItemProps from './CartItem.props';
import styles from './CartItem.module.css';

const CartItem = (props: ICartItemProps) => {
   const dispatch = useDispatch<TypeAppDispatch>();

   // функция добавления в корзину
   const increase = () => {
      dispatch(cartActions.add(props.id));
   };

   const decrease = () => {};
   const remove = () => {};

   return (
      <div className={styles['item']}>
         <div className={styles['image']} style={{ backgroundImage: `url(${props.image}')` }}></div>
         <div className={styles['description']}>
            <div className={styles['name']}>{props.name}</div>
            <div className={styles['currency']}>{props.price}&nbsp;₽</div>
         </div>
         <div className={styles['actions']}>
            <button className={styles['button']} onClick={decrease}>
               <img src='/add-to-cart.svg' alt='удалить из корзины' />
            </button>
            <div>{props.count}</div>
            <button className={styles['button']} onClick={increase}>
               <img src='/add-to-cart.svg' alt='добавить в корзину' />
            </button>
            <button className={styles['remove']} onClick={remove}>
               <img src='/add-to-cart.svg' alt='удалить элемент' />
            </button>
         </div>
      </div>
   );
};

export default CartItem;
