import React, { useState, useEffect } from "react";
import api from "../../../../services/api";
import Swal from 'sweetalert2'
import Noitems from "../NoItems/Noitems";
import './associar.css';

const Associar = ({ abaSelecionada }) => {
    const [problemas, setProblemas] = useState([]);
    const [perguntas, setPerguntas] = useState([]);
    const [idPergunta, setIdPergunta] = useState('');
    const [idProblema, setIdProblema] = useState('');


    const [post, setPost] = useState([]);

    useEffect(() => {
        api
            .get(`problemas/${abaSelecionada}`)
            .then((response) => setProblemas(response.data.problemas))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);

    useEffect(() => {
        api
            .get(`perguntas/${abaSelecionada}`)
            .then((response) => setPerguntas(response.data.perguntas))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);

    const salvarIdPergunta = (event, id) => {
        // Id DA PERGUNTA
        const value = event.target.value;
        setIdPergunta(value);

        // ID DO PROBLEMA
        setIdProblema(id);

    }

    const postAssociar = () => {
        console.log(`PROBLEMA: ${idProblema}`);
        console.log(`PERGUNTA: ${idPergunta}`);

        if (idProblema || idPergunta) {
            api
                .post(`relacao/${abaSelecionada}/${idProblema}/${idPergunta}`, {})
                .then((response) => {
                    setPost(response.data);
                    console.log('deu certo');
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

    console.log(post);

    return (
        <div className="associar">

            {!problemas ?
                <div>
                    <Noitems />
                </div> : problemas.map(element => {
                    return (
                        <div className="box">
                            <h3>{element.id} - {element.nome}</h3>
                            <p>Selecione a pergunta relevante ao problema.</p>
                            <select onChange={e => { salvarIdPergunta(e, element.id) }}>
                                <option>Selecione aqui</option>
                                {perguntas.map((option) => (
                                    <option key={option.id} value={option.id} id={element.id}>
                                        {option.pergunta}
                                    </option>
                                ))}
                            </select>
                            <br />
                            <button onClick={postAssociar}>Adicionar</button>

                        </div>
                    );
                })}

        </div>


    );
}

export default Associar;