import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2'

import './navbar.css';

const Navbar = ({ PegarIdAba }) => {
    const [abas, setAbas] = useState([]);
    const [post, setPost] = React.useState(null);

    useEffect(() => {
        api
            .get('projetos')
            .then((response) => setAbas(response.data.projetos))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, [post]);
    function createProject(nomeProjeto) {
        api
            .post('projetos', {
                nome: nomeProjeto,
            })
            .then((response) => {
                setPost(response.data);
                console.log('deu certo');
            });
    }

    const callModal = () => {
        Swal.fire({
            title: "Novo Projeto",
            text: "Qual é o nome do seu projeto?",
            input: 'text',
            showCancelButton: true
        }).then((result) => {
            if (result.value) {
                createProject(result.value);
                console.log("Result: " + result.value);
            }
        });
    }

    return (
        <div id='navbar'>
            <div>
                <ul>
                    {abas.map(element => {
                        return <li key={element.id} onClick={() => PegarIdAba([element.id, element.nome])}>{element.nome}</li>
                    })}
                </ul>
            </div>
            <div>
                <button onClick={callModal}>+</button>
            </div>
        </div>

    );
}

export default Navbar;