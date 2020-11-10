import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './style.css';
 
export default class Detalhes extends Component {
    state = {
        cliente: {},
    };
 
    componentDidMount() {
        const { cd_cliente } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/sistema/clientes/${cd_cliente}`)
            .then(cliente =>
                cliente.json().then(cliente => this.setState({ cliente }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() { 
        const { cliente } = this.state;
 
        return (
            <div className="cliente-info">
                <h3>Nome do Cliente:</h3>
                <p> {cliente.nm_cliente} </p>
                <h3>CPF:</h3>
                <p> {cliente.cd_cpf} </p>
                <h3>RG:</h3>
                <p> {cliente.cd_rg} </p>
                <h3>Login:</h3>
                <p> {cliente.nm_login} </p>
                <h3>Login:</h3>
                <p> {cliente.nm_senha} </p>               
                <br />
                <Link to={`/clientes`}> Voltar </Link> <br />
                <Link to={`/editarClientes/${cliente.cd_cliente}`}> Editar </Link> <br />
                <Link to={`/deletarClientes/${cliente.cd_cliente}`}> Deletar </Link> <br />
            </div >
        );
    }
}
