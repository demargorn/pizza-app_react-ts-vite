import { lazy, StrictMode, Suspense } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import store from './store/store.ts';
import RequireAuth from './helpers/RequireAuth.tsx';
import AuthLayout from './layout/Auth/AuthLayout.tsx';
import Layout from './layout/Menu/Layout.tsx';
import Cart from './pages/Cart/Cart';
import ErrorPage from './pages/Error/Error';
import Product from './pages/Product/Product.tsx';
import Login from './pages/Login/Login.tsx';
import Success from './pages/Success/Success.tsx';
import Register from './pages/Register/Register.tsx';
import './index.css';

const Menu = lazy(() => import('./pages/Menu/Menu')); // ленивая загрузка

// создаем роутер
const router = createBrowserRouter([
   {
      path: '/',
      element: (
         /* проверка на авторизацию */
         <RequireAuth>
            <Layout />
         </RequireAuth>
      ),
      // несколько страниц в элементе
      children: [
         {
            path: '/',
            element: (
               <Suspense fallback={<>Загрузка...</>}>
                  <Menu />
               </Suspense>
            ),
         },
         {
            path: '/cart', // путь
            element: <Cart />, // компонент
         },
         {
            path: '/success',
            element: <Success />,
         },
         {
            path: '/products/:id',
            element: <Product />,
            errorElement: <>Ошибка</>, // будет показан компонент в случае ошибки в loader
            // функция говорит как загрузить компонент (id === params.id)
            loader: async ({ params }) => {
               return defer({
                  data: new Promise((resolve, reject) => {
                     setTimeout(() => {
                        axios
                           .get(`${PREFIX}/products/${params.id}`)
                           .then((data) => resolve(data))
                           .catch((e) => reject(e));
                     }, 1000);
                  }),
               });
            },
         },
      ],
   },
   {
      path: '/auth',
      element: <AuthLayout />,
      children: [
         {
            path: 'login', // путь без слэша
            element: <Login />,
         },
         {
            path: 'register', // путь без слэша
            element: <Register />,
         },
      ],
   },
   {
      path: '*', // все остальные пути
      element: <ErrorPage />,
   },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
   </StrictMode>
);
