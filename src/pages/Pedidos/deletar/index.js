import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './style.css';
 
class DeletarProduto extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            pedido: {},
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
        const { cd_pedido } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/sistema/pedidos/${cd_pedido}`)
            
        .then(pedido => {
            pedido.json().then(pedido => {
                if (pedido.error) {
                    this.setState({ erro: pedido.error });
                } 
            });
        })
        .catch(erro => this.setState({ erro: erro }));
    }
 
    render() {
        const { redirect } = this.state;
 
        if (redirect) {
            return <Redirect to="/" />;
        } else {
            return (
                <fieldset>
                    <legend>Deletar Pedido</legend>
                    <div className="pedido-delete">
                        <label htmlFor="nome">{this.state.pedido.nome} </label>
                        <p>Tem certeza que deseja deletar este registro?</p>
 
                        <button onClick={this.handleClick}>
                            Remover
                        </button>
                        <br /><br />
                        <Link to={`/pedidos`}>Voltar</Link>
                    </div>
                </fieldset>
            );
        }
    }
 
    handleClick = event => {
        const { cd_pedido } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/sistema/pedidos/${cd_pedido}`, {
            method: "delete"
        })
        
        this.setState({ redirect: true });
 
        event.preventDefault();
    };
}
 
export default DeletarProduto;
