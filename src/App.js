import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './Client/Home';
import AddPeserta from './Components/field-form/addPeserta';
import { AuthForm } from './Components/Auth/AuthForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route index path='/userLogin' element={<AddPeserta />} />
        <Route index path='/userRegister' element={<AuthForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
