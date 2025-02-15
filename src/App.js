import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './Client/Home';
import { AuthForm } from './Components/Auth/AuthForm';

// CONTEXT
import { GetTokenContextProvider } from './Components/Auth/GetTokenContext';
import { PanelAdminProvider } from './Context/ControlPanelAdmin/PanelAdminCtx';

import SnpdbLanding from './Components/SNPDB/Landing/SnpdbLanding';

function App() {
  return (
    <BrowserRouter>
      <GetTokenContextProvider>
        <PanelAdminProvider>
          <Routes>
            <Route index path='/' element={<Home />} />
            <Route index path='/AdminAuth' element={<AuthForm />} />
            <Route index path='/snpdb' element={<SnpdbLanding />} />

          </Routes>
        </PanelAdminProvider>
      </GetTokenContextProvider>
    </BrowserRouter>
  );
}

export default App;
