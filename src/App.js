import React from 'react';
import Routes from './routes';
import Menu from '../src/components/menu/menu.jsx';

import './app.css';
 
function App() {
  return (
    <div className="App">
      <Menu />
      <Routes />
   </div>
  );
}
 
export default App;
