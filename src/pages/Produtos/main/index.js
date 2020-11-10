import React, { Component } from 'react'; 
import { Link } from "react-router-dom";
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default class Main extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { produto } = this.state;
        return(
 
            <div className="produto-list">
                <Link to={`/criarProdutos`}> <button type="button" class="btn btn-success">Novo</button> </Link>
                <br /><br />                
 
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome do Produto</th>
                            <th scope="col">Valor do Produto</th> 
                            <th scope="col"></th>                                     
                            <th scope="col">Ações</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {produto.map((produto) => (
                            <tr>
                                <th scope="row">{produto.cd_produto}</th>
                                <td>{produto.nm_produto}</td>
                                <td>{produto.vl_preco_produto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                
                                <td><Link to={`/produtos/${produto.cd_produto}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td><Link to={`/editarProdutos/${produto.cd_produto}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td><Link to={`/deletarProduto/${produto.cd_produto}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        )
    };
}
