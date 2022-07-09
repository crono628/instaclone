import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Feed from './components/Feed/Feed';
import mockUser from './components/mockUser';
import Nav from './components/Nav';
import Profile from './components/Profile/Profile';

const App = () => {
  return (
    <div className="bg-slate-200">
      <HashRouter>
        <Nav path="/" />
        <div className="max-w-3xl mx-auto">
          <Routes>
            <Route path="profile" element={<Profile user={mockUser} />} />
            {/* <Feed posts={tester.posts} /> */}
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
