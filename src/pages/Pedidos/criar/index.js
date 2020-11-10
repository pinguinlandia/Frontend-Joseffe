import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './style.css';
 
class CriarPedidos extends Component {
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
 
    render() {
        const { redirect } = this.state;        
        if (redirect) {
            return <Redirect to="/" />;
        } else {
            return (                
                <form onSubmit={this.handleSubmit}>                    
                    <fieldset>
                        
                        <legend>Criar Pedido</legend>
                        <div className="pedido-insert">
                            <label htmlFor="qt_produto"> Quantidade do produto </label>
                            <br />
                            <input
                                type="text"
                                id="qt_produto"
                                name="qt_produto"
                                placeholder="Quantidade"
                                minLength="1"
                                maxLength="100"
                                required
                                value={this.state.pedido.qt_produto}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="pedido-insert">
                            <label htmlFor="fk_cd_cliente">Código do cliente</label>
                            <br />
                            <input
                                type="text"
                                id="fk_cd_cliente"
                                name="fk_cd_cliente"
                                placeholder="Código do cliente"
                                required
                                value={this.state.pedido.fk_cd_cliente}
                                onChange={this.handleInputChange}
                            />
                        </div> 
                        <div className="pedido-insert">
                            <label htmlFor="fk_cd_produto">Código do produto</label>
                            <br />
                            <input
                                type="text"
                                id="fk_cd_produto"
                                name="fk_cd_produto"
                                placeholder="Código do produto"
                                required
                                value={this.state.pedido.fk_cd_produto}
                                onChange={this.handleInputChange}
                            />
                        </div> 

                        <button type="submit" className="btn btn-primary">
                            Cadastrar
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
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch("${process.env.REACT_APP_API_URL}/sistema/pedidos", {
            method: "post",
            body: JSON.stringify(this.state.pedido),
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
 
export default CriarPedidos;
