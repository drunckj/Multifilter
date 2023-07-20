import React from 'react';
import logo from './logo.svg';
import './App.css';

import MainContainer from './components/MainContainer';
import FiltersList from './context/ProductFilter';


function App() {

  return (
      <FiltersList>
      <MainContainer/>
      </FiltersList>
 
  );
}

export default App;
