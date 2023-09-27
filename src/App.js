import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListeParticipant from './ListeParticipant';
import Participant from './Participant';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/teste_ligne/participant' element={<Participant />}></Route>
          <Route path='/' element={<ListeParticipant />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
