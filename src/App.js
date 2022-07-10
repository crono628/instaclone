import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext';
import LogIn from './components/Auth/LogIn';
import PrivateRoute from './components/Auth/PrivateRoute';
import SignUp from './components/Auth/SignUp';
import Feed from './components/Feed/Feed';
import mockUser from './components/mockUser';
import Nav from './components/Nav';
import Profile from './components/Profile/Profile';

const App = () => {
  return (
    <div className="bg-slate-200">
      <HashRouter>
        <AuthProvider>
          <Nav path="/" />
          <div className="max-w-3xl mx-auto">
            <Routes>
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route exact path="/" element={<PrivateRoute />}>
                {/* <Route exact path='/' element={<Feed/>} /> */}
                <Route path="/" element={<Profile user={mockUser} />} />
              </Route>
            </Routes>
          </div>
        </AuthProvider>
      </HashRouter>
    </div>
  );
};

export default App;
