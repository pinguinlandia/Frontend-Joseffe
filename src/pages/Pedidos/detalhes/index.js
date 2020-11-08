import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './style.css';
 
export default class Detalhes extends Component {
    state = {
        pedido: {},
    };
 
    componentDidMount() {
        const { cd_pedido } = this.props.match.params;
 
        fetch(`http://localhost:3003/sistema/pedidos/${cd_pedido}`)
            .then(pedido =>
                pedido.json().then(pedido => this.setState({ pedido }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { pedido } = this.state;
 
        return (
            <div className="pedido-info">
                <h1> {pedido.nm_produto} </h1>
                <h1> {pedido.vl_preco_produto} </h1>
                <h1> {pedido.createdAt} </h1>               
                <br />
                <Link to={`/pedidos`}> Voltar </Link> <br />
                <Link to={`/editarPedido/${pedido.cd_pedido}`}> Editar </Link> <br />
                <Link to={`/deletarPedido/${pedido.cd_pedido}`}> Deletar </Link> <br />
            </div >
        );
    }
}
