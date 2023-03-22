import React, { useState } from "react";
import axios from "axios";

function Inferencia() {
  const [relacoes, setRelacoes] = useState([]);
  const [respostaIdProblema, setRespostaIdProblema] = useState("");
  const [contadorSim, setContadorSim] = useState({});

  const handleClickSim = (idProblema) => {
    setContadorSim((prevContadorSim) => ({
      ...prevContadorSim,
      [idProblema]: (prevContadorSim[idProblema] || 0) + 1,
    }));
  };

  const handleClickNao = () => {
    // Não precisa fazer nada
  };

  const getRelacoes = async () => {
    // lastNumber number é o número do ID do projeto! Isso deve estar presente
    // na URL do front como sendo o último argumento do link!
    try {
      const pathArray = window.location.pathname.split("/");
      const lastPathSegment = pathArray[pathArray.length - 1];
      const lastNumber = parseInt(lastPathSegment);
      const url = `http://localhost:3000/relacao/all/${lastNumber}`;
      const response = await axios.get(url);
      setRelacoes(response.data.relacoes);
    } catch (error) {
      console.error(error);
    }
  };

  const getIdProblemaComMaisSim = () => {
    let idProblemaComMaisSim = "";
    let quantidadeDeSim = 0;

    Object.entries(contadorSim).forEach(([idProblema, quantidade]) => {
      if (quantidade > quantidadeDeSim) {
        idProblemaComMaisSim = idProblema;
        quantidadeDeSim = quantidade;
      }
    });

    setRespostaIdProblema(idProblemaComMaisSim);
  };

  const getProblemaById = async (idProblema) => {
    try {
      const pathArray = window.location.pathname.split("/");
      const lastPathSegment = pathArray[pathArray.length - 1];
      const lastNumber = parseInt(lastPathSegment);
      const response = await axios.get(
        `http://localhost:3000/problemas/${lastNumber}/${idProblema}`
      );
      // lastNumber number é o número do ID do projeto! Isso deve estar presente
      // na URL do front como sendo o último argumento do link!
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetProblemaById = () => {
    getProblemaById(respostaIdProblema);
  };

  const renderRelacoes = () => {
    return relacoes.map((relacao) => (
      <div key={relacao.id}>
        <p>{relacao.descricao}</p>
        <button onClick={() => handleClickSim(relacao.id_problema)}>Sim</button>
        <button onClick={handleClickNao}>Não</button>
      </div>
    ));
  };

  return (
    <div className="App">
      <h1>Relações</h1>
      <button onClick={getRelacoes}>Buscar relações</button>
      {relacoes.length > 0 && renderRelacoes()}
      <button onClick={getIdProblemaComMaisSim}>
        Verificar id_problema com mais "sim"
      </button>
      {respostaIdProblema !== "" && (
        <div>
          <p>{`O id_problema com mais "sim" é ${respostaIdProblema}`}</p>
          <button onClick={handleGetProblemaById}>
            Buscar problema pelo id_problema
          </button>
        </div>
      )}
    </div>
  );
}

export default Inferencia;