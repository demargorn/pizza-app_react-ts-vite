import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout/Layout.tsx';
import Menu from './pages/Menu/Menu';
import Cart from './pages/Cart/Cart';
import Error from './pages/Error/Error';
import Product from './pages/Product/Product.tsx';
import './index.css';

const router = createBrowserRouter([
   {
      path: '/',
      element: <Layout />,
      children: [
         {
            path: '/',
            element: <Menu />,
         },
         {
            path: '/cart',
            element: <Cart />,
         },
         {
            path: '/products/:id',
            element: <Product />,
         },
      ],
      
   },
   {
      path: '*',
      element: <Error />,
   },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <RouterProvider router={router} />
   </StrictMode>
);
