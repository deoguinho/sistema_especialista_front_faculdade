import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../../../services/api";
import Swal from 'sweetalert2'
import './inferencia.css';
import Noitems from "../NoItems/Noitems";

function Inferencia({ abaSelecionada }) {
    const [relacoes, setRelacoes] = useState([]);
    const [respostaIdProblema, setRespostaIdProblema] = useState("");
    const [contadorSim, setContadorSim] = useState({});
    const [disaCounter, setDisaCounter] = useState(1);

    const handleClickSim = (idProblema) => {
        setContadorSim((prevContadorSim) => ({
            ...prevContadorSim,
            [idProblema]: (prevContadorSim[idProblema] || 0) + 1
        }));
        setDisaCounter(disaCounter + 1);
    };

    useEffect(() => {
        api
            .get(`relacao/all/${abaSelecionada}`)
            .then((response) => setRelacoes(response.data.relações))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);

    const getIdProblemaComMaisSim = () => {
        let idProblemaComMaisSim = [];
        let quantidadeDeSim = 0;

        Object.entries(contadorSim).forEach(([idProblema, quantidade]) => {
            if (quantidade >= quantidadeDeSim) {
                if (quantidade > quantidadeDeSim) {
                    idProblemaComMaisSim = [idProblema];
                } else {
                    idProblemaComMaisSim.push(idProblema);
                }
                quantidadeDeSim = quantidade;
            }
        });

        setRespostaIdProblema(idProblemaComMaisSim);

        if (idProblemaComMaisSim !== '' && idProblemaComMaisSim !== undefined && idProblemaComMaisSim !== null) {
            getProblemaById(idProblemaComMaisSim);
        } else {
            Swal.fire({
                title: `Está faltando algo...`,
                text: `Primeiramente você definir alguma das perguntas acima como verdadeiro.`,
                showCancelButton: true
            })
        }
    };

    const getExplicacao = async (justificativa) => {
        Swal.fire({
            title: `Motivo da pergunta: `,
            text: `${justificativa}`,
            showCancelButton: true
        })

    }

    const getProblemaById = async (idProblema) => {
        let responseHere = [];
        let texto = "";
        if (idProblema.length > 1) {
            for (var i = 0; i < idProblema.length; i++) {
                try {
                    const response = await axios.get(
                        `http://localhost:3000/problemas/${abaSelecionada}/${idProblema[i]}`
                    );
                    responseHere.push(response.data)
                    // lastNumber number é o número do ID do projeto! Isso deve estar presente
                    // na URL do front como sendo o último argumento do link!
                } catch (error) {
                    console.error(error);
                }
                for (var j = 0; j < responseHere.length; j++) {
                    texto += `${responseHere[i].problemas.nome}‎ | ‎ \n`
                }

                Swal.fire({
                    title: `O problema relacionado foi: `,
                    text: `${texto}`,
                    showCancelButton: true
                }).then(() => {

                });
            }
        } else {
            try {
                const response = await axios.get(
                    `http://localhost:3000/problemas/${abaSelecionada}/${idProblema}`
                );
                // lastNumber number é o número do ID do projeto! Isso deve estar presente
                // na URL do front como sendo o último argumento do link!
                Swal.fire({
                    title: `O problema relacionado foi: `,
                    text: `${response.data.problemas.nome}`,
                    showCancelButton: true
                }).then(() => {

                });
                // renderiza um modal com todas as informações
            } catch (error) {
                console.error(error);
            }
        }
    };

    const rederSwal = (text) => {
        Swal.fire({
            title: `O problema relacionado foi: `,
            text: `${text}`,
            showCancelButton: true
        }).then(() => {

        });
    }

    const renderRelacoes = () => {
        return relacoes.map((relacao, index) => (
            <div disabled={index + 1 != disaCounter} key={relacao.id} className="boxInfe" aria-disabled>
                <h3>{relacao.pergunta}</h3>
                <p>{relacao.descricao}</p>
                <div>
                    <button onClick={() => handleClickSim(relacao.id_problema)}>Sim</button>
                    <button onClick={() => { setDisaCounter(disaCounter + 1) }}>Não</button>
                    {relacao.justificativa &&
                        <button className="justifica" onClick={() => getExplicacao(relacao.justificativa)}>Por que estou vendo essa pergunta?</button>
                    }
                </div>
            </div>
        ));
    };

    return (
        <div className="inferencia">
            <h1>Relações</h1>
            {!relacoes ? <Noitems /> : relacoes.length > 0 && renderRelacoes()}
            <button hidden={!relacoes} onClick={getIdProblemaComMaisSim}>
                Buscar problema
            </button>
        </div>
    );
}

export default Inferencia;