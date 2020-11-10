import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './style.css';
 
class DeletarClientes extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            cliente: {},
            erro: null,
            redirect: false
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    componentDidMount() {
        const { cd_cliente } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/sistema/clientes/${cd_cliente}`)
            
        .then(data => { 
            data.json().then(data => {
                if (data.error) {
                    this.setState({ erro: data.error });
                } else {
                    this.setState({ cliente: data });
                }
            });
        })
        .catch(erro => this.setState({ erro: erro }));
    }
 
    render() {
        const { redirect } = this.state;
 
        if (redirect) {
            return <Redirect to="/clientes" />;
        } else {
            return (
                <fieldset>
                    
                    <div className="cliente-delete">
                    <legend>Deletar cliente</legend>
                        <label htmlFor="nome">{this.state.cliente.nm_cliente}</label>
                        <p>Tem certeza que deseja deletar este registro?</p>
 
                        <button onClick={this.handleClick}>
                            Remover
                        </button>
                        <br /><br />
                        <Link to={`/clientes`}>Voltar</Link>
                    </div>
                </fieldset>
            );
        }
    }
 
    handleClick = event => {
        const { cd_cliente } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/sistema/clientes/${cd_cliente}`, {
            method: "delete"
        })

        this.setState({ redirect: true });
 
        event.preventDefault();
    };
}
 
export default DeletarClientes;
