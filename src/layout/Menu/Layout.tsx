import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { TypeAppDispatch } from '../../store/store';
import { userActions } from '../../store/user.slice';
import cn from 'classnames';
import styles from './Layout.module.css';

const Layout = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch<TypeAppDispatch>();

   const logOut = () => {
      dispatch(userActions.logOut());
      navigate('/auth/login');
   };

   return (
      <div className={styles['layout']}>
         <div className={styles['side-bar']}>
            <div className={styles['user']}>
               <img className={styles['avatar']} src='/avatar.svg' alt='аватар пользователя' />
               <div className={styles['name']}>User</div>
               <div className={styles['email']}>example@gmail.com</div>
            </div>
            <div className={styles['menu']}>
               <NavLink
                  to='/'
                  className={({ isActive }) =>
                     cn(styles['link'], {
                        [styles.active]: isActive,
                     })
                  }
               >
                  <img src='/menu.svg' alt='иконка меню' />
                  Меню
               </NavLink>
               <NavLink
                  to='/cart'
                  className={({ isActive }) =>
                     cn(styles['link'], {
                        [styles.active]: isActive,
                     })
                  }
               >
                  <img src='/cart.svg' alt='иконка корзины' />
                  Корзина
               </NavLink>
            </div>
            <Button className={styles['exit']} onClick={logOut}>
               <img src='/exit.svg' alt='иконка выхода' />
               Выход
            </Button>
         </div>
         <div className={styles['content']}>
            <Outlet /> {/*для подставления children-компонентов*/}
         </div>
      </div>
   );
};

export default Layout;
