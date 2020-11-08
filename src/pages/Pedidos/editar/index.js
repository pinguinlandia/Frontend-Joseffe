import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './style.css';
 
class EditarProduto extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            pedido: {
                qt_produto: "",
                fk_cd_cliente: "",
                fk_cd_produto: ""                 
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
        const { cd_pedido } = this.props.match.params;
 
        fetch(`http://localhost:3003/sistema/pedidos/${cd_pedido}`)
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
                        <legend>Editar Pedido</legend>
                        <div className="pedido-update">
                            <label htmlFor="qt_produto">Quantidade do produto</label>
                            <br />
                            <input
                                type="text"
                                id="qt_produto"
                                name="qt_produto"
                                placeholder="Nome"
                                minLength="1"
                                maxLength="100"
                                required
                                value={this.state.pedido.qt_produto}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="pedido-update">
                            <label htmlFor="fk_cd_cliente"> Código do Cliente </label>
                            <br />
                            <input
                                type="text"
                                id="fk_cd_cliente"
                                name="fk_cd_cliente"
                                placeholder="Código"
                                min="1"
                                max="99"
                                required
                                value={this.state.pedido.fk_cd_cliente}
                                onChange={this.handleInputChange}
                            />
                        </div>  
                        <div className="pedido-update">
                            <label htmlFor="fk_cd_produto"> Código do Produto </label>
                            <br />
                            <input
                                type="text"
                                id="fk_cd_produto"
                                name="fk_cd_produto"
                                placeholder="Código"
                                min="1"
                                max="99"
                                required
                                value={this.state.pedido.fk_cd_produto}
                                onChange={this.handleInputChange}
                            />
                        </div>                       
 
                        <button type="submit" className="btn btn-primary">
                            Atualizar
                    </button>
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
            pedido: { ...prevState.pedido, [name]: value }
        }));
    };
 
    handleSubmit = event => {
        const { cd_pedido } = this.state.usuario;
 
        fetch(`http://localhost:3003/sistema/pedido/${cd_pedido}`, {
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
