import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './component/AppLayout';
import Home from './component/Home';
import Products from './component/Product';
import Contact from './component/Contact';
import About from './component/About';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Profile from './component/profile';
import OrderHis from './component/OrderHis';
import Admin from './component/Admin';
const App = () => {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<AppLayout />,
      children:[
        {
          path:"/",
          element: <Home />
        },
        
        {
          path:"/products",
          element: <Products />
        },
        {
          path:"/contact",
          element: <Contact />
        },
        {
          path:"/about",
          element: <About />
        },
        {
          path:"/login",
          element: <Login />
        },
        {
          path:"/signUp",
          element: <SignUp />
        },
        {
          path:"/profile",
          element: <Profile />
        },
        {
          path:"/orderHis",
          element: <OrderHis />
        },
        {
          path:"/admin",
          element: <Admin />
        },
        
      ]
    }
  ])
   return <RouterProvider router={router} /> ;

}

export default App;
