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
 
    componentDidMount() {
        const { cd_produto } = this.props.match.params;
 
        fetch(`http://localhost:3003/sistema/produtos/${cd_produto}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ usuario: data });
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
                    <div className="produto-delete">
                    <legend>Deletar Produto</legend>
                        <label htmlFor="nome">{this.state.produto.nome} </label>
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
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
 
        event.preventDefault();
    };
}
 
export default DeletarProduto;
