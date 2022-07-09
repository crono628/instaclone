import React from 'react';
import Feed from './components/Feed/Feed';
import mockUser from './components/mockUser';
import Nav from './components/Nav';
import Profile from './components/Profile/Profile';

const App = () => {
  return (
    <div className="bg-slate-200">
      <Nav />
      <div className="max-w-5xl mx-auto">
        <Profile user={mockUser} />
        {/* <Feed posts={tester.posts} /> */}
      </div>
    </div>
  );
};

export default App;
