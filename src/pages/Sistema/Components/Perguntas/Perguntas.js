import React, { useState, useEffect } from "react";
import api from "../../../../services/api";
import Swal from 'sweetalert2'
import './pergunta.css';

const Perguntas = ({ abaSelecionada }) => {
    const [createPergunta, setCreatePergunta] = useState('');
    const [pergunta, setPergunta] = useState();
    const [descricao, setDescricao] = useState();
    const [justificativa, setJustificativa] = useState();

    const [getPerguntas, setGetPerguntas] = useState([]);

    const CriarPergunta = () => {
        if (pergunta && descricao) {
            api
                .post(`perguntas/${abaSelecionada}`, {
                    pergunta,
                    descricao,
                    justificativa
                })
                .then((response) => {
                    setCreatePergunta(response.data);
                    setPergunta('');
                    setDescricao('');
                    setJustificativa('');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Pergunta salva com sucesso!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que há campos a serem preenchidos!',
            })
        }
    }

    useEffect(() => {
        api
            .get(`perguntas/${abaSelecionada}`)
            .then((response) => setGetPerguntas(response.data.perguntas))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, [createPergunta]);

    const handleDescricao = (e) => {
        setDescricao(e.target.value);
    }
    const handlePergunta = (e) => {
        setPergunta(e.target.value);
    }
    const handleJustificativa = (e) => {
        setJustificativa(e.target.value);
    }

    const showDetailPergunta = (nome, descricao) => {

        Swal.fire(
            `${nome}`,
            `${descricao}`,
            'question'
        )
    }
    return (
        <div id="main_perguntas">

            <div className="perguntas">
                <h2>Perguntas</h2>
                {!getPerguntas ? 'sem itens': getPerguntas.map((option, index) => (
                    <p key={option.id} value={option.id} onClick={() => { showDetailPergunta(option.pergunta, option.descricao) }}>
                        <b>{index + 1}</b> - {option.pergunta}
                    </p>
                ))}
            </div>
            <div>
                <div className="FormDiv">
                    <label>Pergunta: </label>
                    <input type="text" value={pergunta} onChange={handlePergunta} placeholder="Digite a pergunta aqui..." />
                </div>
                <div className="FormDiv">
                    <label>Descrição: </label>
                    <input type="text" value={descricao} onChange={handleDescricao} placeholder="Digite uma descrição para o problema..." />
                </div>
                <div className="FormDiv">
                    <label>Justifique ao usuario o porque dele estar vendo essa pergunta: </label>
                    <input type="text" value={justificativa} onChange={handleJustificativa} />
                </div>
                <div className="FormDiv">
                    <button onClick={CriarPergunta}>Criar pergunta</button>

                </div>
            </div>

        </div>
    );
}

export default Perguntas;   