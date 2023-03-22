import React, { useState, useEffect } from "react";
import './sistema.css';
import Perguntas from "./Components/Perguntas/Perguntas";
import Problemas from "./Components/Problemas/Problemas";
import Associar from "./Components/Associar/Associar";
import Inferencia from "./Components/Inferencia/inferencia";

const Sistema = ({ abaSelecionada }) => {
    const [opcao, setOpcao] = useState();
    useEffect(() => {
        setOpcao('inicio');
    }, [abaSelecionada]);
    return (
        <>

            <div id="main">
                <div className="sideBar">
                    <h2>{abaSelecionada[1]}</h2>
                    <h2>Menu</h2>
                    <button onClick={() => { setOpcao('perguntas') }}>Criar perguntas</button><br />
                    <button onClick={() => { setOpcao('problemas') }}>Criar problemas</button><br />
                    <button onClick={() => { setOpcao('associar') }}>Associar perguntas</button><br />
                    <button onClick={() => { setOpcao('rodar') }}>Rodar</button><br />
                </div>
                <div className="rightbar">
                    {opcao === 'inicio' ? 'selecione a opção' : ''}
                    {opcao === 'perguntas' ? <Perguntas abaSelecionada={abaSelecionada[0]} /> : ''}
                    {opcao === 'problemas' ? <Problemas abaSelecionada={abaSelecionada[0]} /> : ''}
                    {opcao === 'associar' ? <Associar abaSelecionada={abaSelecionada[0]} /> : ''}
                    {opcao === 'rodar' ? <Inferencia abaSelecionada={abaSelecionada[0]} /> : ''}

                </div>
            </div>
        </>
    );
}
export default Sistema;