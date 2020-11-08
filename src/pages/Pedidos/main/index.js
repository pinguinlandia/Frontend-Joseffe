import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default class Main extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            pedido: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(`http://localhost:3003/sistema/pedidos`)
            .then(pedido =>
                pedido.json().then(pedido => this.setState({ pedido }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { pedido } = this.state;
        return(
 
            <div className="pedido-list">
                <Link to={`/criarPedidos`}> <button type="button" class="btn btn-success">Novo</button> </Link>
                <br /><br />                
 
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Código do Cliente</th>
                            <th scope="col">Código do produto</th>                            
                            <th scope="col">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedido.map((pedido) => (
                            <tr>
                                <th scope="row">{pedido.qt_produto}</th>
                                <td>{pedido.fk_cd_cliente}</td>
                                <td>{pedido.fk_cd_produto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                
                                <td><Link to={`/pedidos/${pedido.cd_pedido}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td><Link to={`/editarPedidos/${pedido.cd_pedido}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td><Link to={`/deletarPedidos/${pedido.cd_pedido}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        )
    };
}
