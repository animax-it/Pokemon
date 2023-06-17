import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonList from './PokemonList';
import LazyLoadComponent from './LazyLoadComponent';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/lazy-load" element={<LazyLoadComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
