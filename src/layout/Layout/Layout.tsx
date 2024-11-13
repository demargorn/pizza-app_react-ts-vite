import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';

const Layout = () => {
   return (
      <div className={styles['layout']}>
         <div className={styles['side-bar']}>
            <div className={styles['user']}>
               <img className={styles['avatar']} src='/avatar.svg' alt='аватар пользователя' />
               <div className={styles['name']}>User</div>
               <div className={styles['email']}>example@gmail.com</div>
            </div>
            <div className={styles['menu']}>
               <Link to='/' className={styles['link']}>
                  <img src='/menu.svg' alt='иконка меню' />
                  Меню
               </Link>
               <Link to='/cart' className={styles['link']}>
                  <img src='/cart.svg' alt='иконка корзины' />
                  Корзина
               </Link>
            </div>
            <Button className={styles['exit']}>
               <img src='/exit.svg' alt='иконка выхода' />
               Выход
            </Button>
         </div>
         <div>
            <Outlet />
         </div>
      </div>
   );
};

export default Layout;
