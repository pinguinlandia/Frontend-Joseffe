import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './style.css';
 
class DeletarProduto extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: {},
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
 
    
 
    render() {
        const { redirect } = this.state;
 
        if (redirect) {
            return <Redirect to="/Produtos" />;
        } else {
            return (
                <fieldset>                    
                    <div className="produto-delete">
                    <legend>Deletar Produto</legend>
                        <label htmlFor="nome">{this.state.produto.nm_produto} </label>
                        <p>Tem certeza que deseja deletar este registro?</p>
                        <div className="button">
                        <button
                            onClick={this.handleClick}
                        >
                            Remover
                        </button>
                        <br /><br />
                        <Link to={`/`}>Voltar</Link>
                        </div>
                    </div>
                </fieldset>
            );
        }
    }
 
    handleClick = event => {
        const { cd_produto } = this.props.match.params;
 
        fetch(`http://localhost:3003/sistema/produtos/${cd_produto}`, {
            method: "delete"
        })

        this.setState({ redirect: true });
 
        event.preventDefault();
    };
}
 
export default DeletarProduto;
