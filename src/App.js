import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//files imports
import './App.css';
import { publicRoutes } from './routes/publicRoutes';
import { adminRoutes } from './routes/adminRoutes';



function App() {

  const router = createBrowserRouter([
    ...publicRoutes,
    ...adminRoutes
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
