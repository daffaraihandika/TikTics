import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Dashboard from './pages/Dashboard';
import TopContent from './pages/Search/TopContent';
import TopInfluencer from './pages/Search/TopInfluencer';
import StatistikInfluencer from './pages/Statistik/StatistikInfluencer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/top-content" element={<TopContent/>}/>
        <Route path="/top-influencer" element={<TopInfluencer/>}/>
        <Route path="/influencer-detail" element={<StatistikInfluencer/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
