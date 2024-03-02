import './App.css';
import NavBar from './components/NavBar/navbar';
import {Home} from './components/Home/home';
import {Rol} from './components/Rol/rol';
import {TipoChori} from './components/TipoChori/tipoChori';
import {ChoriFest} from './components/Chorifest/chorifest';
import {Usuario} from './components/Usuario/usuario';
import { useEffect } from 'react';
import { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {  
  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/chorifest/rol" element={<Rol/>} />
          <Route exact path="/chorifest/tipochori" element={<TipoChori/>} />
          <Route exact path="/chorifest/choris" element={<ChoriFest/>} />
          <Route exact path="/chorifest/usuarios" element={<Usuario/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;