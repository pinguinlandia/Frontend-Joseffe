import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import './style.css';
 
class EditarProduto extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: {
                nm_produto: "",
                vl_preco_produto: "",                
            },
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
                        this.setState({ produto: data });
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
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Editar Produto</legend>
                        <div className="produto-update">
                            <label htmlFor="nm_produto">Nome do Produto</label>
                            <br />
                            <input
                                type="text"
                                id="nm_produto"
                                name="nm_produto"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.nm_produto}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-update">
                            <label htmlFor="vl_preco_produto"> Valor </label>
                            <br />
                            <input
                                type="text"
                                id="vl_preco_produto"
                                name="vl_preco_produto"
                                placeholder="Valor"
                                min="1"
                                max="99999"
                                required
                                value={this.state.produto.vl_preco_produto}
                                onChange={this.handleInputChange}
                            />
                        </div>                        
 
                        <button type="submit" className="btn btn-primary">
                            Atualizar
                        </button>

                        <Link to="/"><button className="btn btn-primary">
                            Voltar
                        </button></Link>
                    </fieldset>
                </form>
            );
        }
    }
 
 
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            produto: { ...prevState.produto, [name]: value }
        }));
    };
 
    handleSubmit = event => {
        const { cd_produto } = this.state.usuario;
 
        fetch(`http://localhost:3003/sistema/produto/${cd_produto}`, {
            method: "put",
            body: JSON.stringify(this.state.produto),
            headers: {
                "Content-Type": "application/json"
            }
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
 
export default EditarProduto;
