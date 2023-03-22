import React, { useState } from 'react';
import './App.css';
import Navbar from './pages/navbar/Navbar';
import Inferencia from './inferencia.js';
import Sistema from './pages/Sistema/Sistema';

function App() {
  const [abaSelecionada, setAbaSelecionada] = useState([]);
  const PegarIdAba = (idAba) => {
    setAbaSelecionada(idAba);
  }
  console.log(`Aba selecionada: ${abaSelecionada[0]}`);
  return (
    <div className="App">
      <Navbar PegarIdAba={PegarIdAba} />
      {/* <Inferencia /> */}
      <div>
        {abaSelecionada.length > 0 ?
          <Sistema abaSelecionada={abaSelecionada} />
          : 'Ops, parece que você ainda não selecionou nenhum sistema especialista!'}

      </div>
    </div>
  );
}

export default App;
