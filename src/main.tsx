import axios from 'axios';
import { lazy, StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PREFIX } from './helpers/API.ts';
import Layout from './layout/Layout/Layout.tsx';
import Cart from './pages/Cart/Cart';
import ErrorPage from './pages/Error/Error';
import Product from './pages/Product/Product.tsx';
import './index.css';

const Menu = lazy(() => import('./pages/Menu/Menu')); // ленивая загрузка

// создаем роутер
const router = createBrowserRouter([
   {
      path: '/', // путь
      element: <Layout />, // компонент
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
            path: '/cart',
            element: <Cart />,
         },
         {
            path: '/products/:id',
            element: <Product />,
            errorElement: <>Error</>, // будет показан компонент в случае ошибки в loader
            // функция говорит как загрузить компонент (id === params.id)
            loader: async ({ params }) => {
               await new Promise<void>((resolve) => {
                  setTimeout(() => {
                     resolve();
                  }, 2000);
               });
               const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
               return data;
            },
         },
      ],
   },
   {
      path: '*', // все осталтные пути
      element: <ErrorPage />,
   },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <RouterProvider router={router} />
   </StrictMode>
);
