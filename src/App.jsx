import React, { useState, createContext } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Privacy from './Pages/Privacy-policy';
import Return from './Pages/Return-policy';
import Product from './Pages/Product';
import ProductDetail from './Pages/ProductDetails'; 
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Profile from './Pages/Profile';

export const ThemeContext = createContext();

// Persistent Layout Wrapper
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/Login' , element: <Login/> },
      {path: '/signup' , element:<Signup/>},
      {path: '/profile' , element: <Profile/>},
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/privacy-policy', element: <Privacy /> },
      { path: '/return', element: <Return /> },
      { path: '/product', element: <Product /> },
      { path: '/product/:id', element: <ProductDetail /> }, // Dynamic route for single shoe detail
    ],
  },
]);

const App = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* Dark mode wrapper class for Tailwind */}
      <div className={theme === 'dark' ? 'dark' : ''}>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <RouterProvider router={router} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;