import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './style.css';
 
export default class Detalhes extends Component {
    state = {
        pedido: {},
    };
 
    componentDidMount() {
        const { cd_pedido } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/sistema/pedidos/${cd_pedido}`)
            .then(pedido =>
                pedido.json().then(pedido => this.setState({ pedido }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { pedido } = this.state;
 
        return (
            <div className="pedido-info">
                <h3>Quantidade de produto:</h3>
                <p> {pedido.qt_produto} </p>
                <h3>código do cliente:</h3>
                <p> {pedido.fk_cd_cliente} </p>
                <h3>Código do produto:</h3>
                <p> {pedido.fk_cd_produto} </p>               
                <br />
                <Link to={`/pedidos`}> Voltar </Link> <br />
                <Link to={`/editarPedido/${pedido.cd_pedido}`}> Editar </Link> <br />
                <Link to={`/deletarPedido/${pedido.cd_pedido}`}> Deletar </Link> <br />
            </div >
        );
    }
}
