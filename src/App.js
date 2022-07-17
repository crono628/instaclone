import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext';
import LogIn from './components/Auth/LogIn';
import PrivateRoute from './components/Auth/PrivateRoute';
import SignUp from './components/Auth/SignUp';
import Nav from './components/Nav';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import Verify from './components/Settings/Verify';

const App = () => {
  return (
    <div className="bg-slate-200 h-screen w-screen">
      <AuthProvider>
        <HashRouter>
          <Nav path="/" />
          <div className="max-w-3xl mx-auto">
            <Routes>
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/verify" element={<Verify />} />
              </Route>
            </Routes>
          </div>
        </HashRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
