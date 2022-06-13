/**
 * @fileoverview index.js entry point
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './js/App';
import PokeInfo from './js/PokeInfo'
import store from './js/redux/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path=":pokemonName" element={<PokeInfo />} />
      </Routes>
    </BrowserRouter >
  </Provider>
);
