import React, { useState, useEffect } from "react";
import api from "../../../../services/api";
import Swal from 'sweetalert2'
import './problemas.css';

const Problemas = ({ abaSelecionada }) => {
    const [createPergunta, setCreatePergunta] = useState('');
    const [problema, setProblema] = useState();
    const [getProblemas, setGetProblemas] = useState([]);

    const CriarProblema = () => {
        if (problema) {
            api
                .post(`problemas/${abaSelecionada}`, {
                    problema
                })
                .then((response) => {
                    setCreatePergunta(response.data);
                    setProblema('');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Problema salva com sucesso!',
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

    const handleProblema = (e) => {
        console.log(e.target.value);
        setProblema(e.target.value);
    }

    useEffect(() => {
        api
            .get(`problemas/${abaSelecionada}`)
            .then((response) => setGetProblemas(response.data.problemas))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, [createPergunta]);


    const showDetailProblemas = (nome, descricao) => {
        Swal.fire(
            `${nome}`,
            ``,
            'question'
        )
    }


    return (
        <div id="main_perguntas">
            <div className="perguntas">
                <h2>Perguntas</h2>
                {!getProblemas ? 'sem itens' : getProblemas.map((option, index) => (
                    <p key={option.id} value={option.id} onClick={() => { showDetailProblemas(option.nome) }}>
                        <b>{index + 1}</b> - {option.nome}
                    </p>
                ))}
            </div>
            <div>
                <div className="FormDiv">
                    <label>Problema: </label>
                    <input type="text" value={problema} onChange={handleProblema} placeholder="Digite seu problema aqui..." />
                </div>
                <div className="FormDiv">
                    <button onClick={CriarProblema}>Criar problema</button>

                </div>
            </div>
        </div>
    );
}

export default Problemas;