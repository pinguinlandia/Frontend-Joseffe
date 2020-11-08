import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default class Main extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            cliente: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(`http://localhost:3003/sistema/clientes`)
            .then(cliente =>
                cliente.json().then(cliente => this.setState({ cliente }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { cliente } = this.state;
        return(
 
            <div className="cliente-list">
                <Link to={`/criarClientes`}> <button type="button" class="btn btn-success">Novo</button> </Link>
                <br /><br />                
 
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome do Cliente</th>
                            <th scope="col">CPF</th>
                            <th scope="col">RG</th>
                            <th scope="col">Login</th> 
                            <th scope="col">Senha</th>                             
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cliente.map((cliente) => (
                            <tr>
                                <th scope="row">{cliente.cd_cliente}</th>
                                <td>{cliente.nm_cliente}</td>
                                <td>{cliente.cd_cpf}</td>
                                <td>{cliente.cd_rg}</td>
                                <td>{cliente.nm_login}</td>
                                <td>{cliente.nm_senha}</td>                          
                                
                                <td><Link to={`/clientes/${cliente.cd_cliente}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td><Link to={`/editarClientes/${cliente.cd_cliente}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td><Link to={`/deletarClientes/${cliente.cd_cliente}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        )
    };
}
