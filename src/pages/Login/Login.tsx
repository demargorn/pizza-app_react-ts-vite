import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import ILoginForm from '../../interfaces/LoginForm.interface';
import styles from './Login.module.css';

const Login = () => {
   const [error, setError] = useState<string | null>();
   const submit = async (e: FormEvent) => {
      e.preventDefault();
      setError(null);
      const target = e.target as typeof e.target & ILoginForm; // типизация target
      const { email, password } = target;
      await sendLogin(email.value, password.value);
   };

   const sendLogin = async (email: string, password: string) => {
      try {
         const { data } = await axios.post(`${PREFIX}/auth/login`, {
            email,
            password,
         });
      } catch (error) {
         if (error instanceof AxiosError) {
            setError(error.message);
            console.log(error.response?.data.message);
         }
      }
   };

   return (
      <div className={styles['login']}>
         <Headling>Вход</Headling>
         {error && <div className={styles['error']}>{error}</div>}
         <form className={styles['form']} onSubmit={submit}>
            <div className={styles['field']}>
               <label htmlFor='email'>Ваш email</label>
               <Input id='email' name='email' type='email' placeholder='Email' />
            </div>
            <div className={styles['field']}>
               <label htmlFor='password'>Пароль</label>
               <Input id='password' name='password' type='password' placeholder='Пароль' />
            </div>
            <Button appearence='big'>Вход</Button>
         </form>
         <div className={styles['footer']}>
            <div>Нет аккаунта?</div>
            <Link to='/auth/register'>Зарегистрироваться</Link>
         </div>
      </div>
   );
};

export default Login;