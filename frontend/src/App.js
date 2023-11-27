import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Dashboard from './pages/Dashboard';
import TopContent from './pages/Search/TopContent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/top-content" element={<TopContent/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
