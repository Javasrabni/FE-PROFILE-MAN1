import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './Client/Home';
import AddPeserta from './Components/field-form/addPeserta';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route index path='/Pendaftaran-SNPDB' element={<AddPeserta />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
