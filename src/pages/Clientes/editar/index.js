import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './style.css';
 
class EditarClientes extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            cliente: {
                nm_cliente: "",
                cd_cpf: "",
                cd_rg: "",
                nm_login: "",
                nm_senha: ""              
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
        const { cd_cliente } = this.props.match.params;
 
        fetch(`http://localhost:3003/sistema/clientes/${cd_cliente}`)
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
                        <legend>Editar Cliente</legend>
                        <div className="cliente-insert">
                            <label htmlFor="nm_cliente"> Nome do Cliente </label>
                            <br />
                            <input
                                type="text"
                                id="nm_cliente"
                                name="nm_cliente"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.cliente.nm_cliente}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="cliente-insert">
                            <label htmlFor="cd_cpf">CPF</label>
                            <br />
                            <input
                                type="text"
                                id="cd_cpf"
                                name="cd_cpf"
                                placeholder="CPF"
                                required
                                value={this.state.cliente.cd_cpf}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="cliente-insert">
                            <label htmlFor="cd_rg">RG</label>
                            <br />
                            <input
                                type="text"
                                id="cd_rg"
                                name="cd_rg"
                                placeholder="RG"
                                required
                                value={this.state.cliente.cd_rg}
                                onChange={this.handleInputChange}
                            />
                        </div> 
                        <div className="cliente-insert">
                            <label htmlFor="nm_login">Login</label>
                            <br />
                            <input
                                type="text"
                                id="nm_login"
                                name="nm_login"
                                placeholder="Login"
                                required
                                value={this.state.cliente.nm_login}
                                onChange={this.handleInputChange}
                            />
                        </div> 
                        <div className="cliente-insert">
                            <label htmlFor="nm_senha">Senha</label>
                            <br />
                            <input
                                type="text"
                                id="nm_senha"
                                name="nm_senha"
                                placeholder="Senha"
                                required
                                value={this.state.cliente.nm_senha}
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
            cliente: { ...prevState.cliente, [name]: value }
        }));
    };
 
    handleSubmit = event => {
        const { cd_cliente } = this.state.cliente;
 
        fetch(`http://localhost:3003/sistema/clientes/${cd_cliente}`, {
            method: "put",
            body: JSON.stringify(this.state.cliente),
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
 
export default EditarClientes;
