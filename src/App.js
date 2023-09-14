import { BrowserRouter, Routes, Route } from 'react-router-dom';

//components import 
import Home from './pages/public/Home'
import DashBoard from './pages/admin/dashBoard';
import About from './pages/public/About'
//files imports
import './App.css';
import Login from './pages/admin/login';
import SignUp from './pages/admin/signUp';
import ProtectedRoute from './pages/admin/ProtectedRoute';




function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin/login" element={<Login/>}/>
        <Route path="/admin/sign-up" element={<SignUp/>}/>
        <Route path="/admin/dashboard/*" element={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
