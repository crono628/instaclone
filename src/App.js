import React from 'react';
import Feed from './components/Feed';
import mockData from './components/mockData';
import Nav from './components/Nav';

let tester = mockData.find((user) => user.name === 'Mikey');

const App = () => {
  return (
    <div>
      <Nav />
      <Feed posts={tester.posts} />
    </div>
  );
};

export default App;
