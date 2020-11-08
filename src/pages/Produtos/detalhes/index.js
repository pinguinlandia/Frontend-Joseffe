import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './style.css';
 
export default class Detalhes extends Component {
    state = {
        produto: {},
    };
 
    componentDidMount() {
        const { cd_produto } = this.props.match.params;
 
        fetch(`http://localhost:3003/sistema/produtos/${cd_produto}`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { produto } = this.state;
 
        return (          
            <div className="usuario-info">
                <h3>Nome do Produto:</h3>
                <p> {produto.nm_produto} </p>
                <h3>Preço do produto:</h3>
                <p> {produto.vl_preco_produto} </p>
                <h3>Data de modificação:</h3>
                <p> {produto.createdAt} </p>               
                <br />
                <Link to={`/`}> Voltar </Link>
                <Link to={`/editarUsuario/${produto.cd_produto}`}> Editar </Link>
                <Link to={`/deletarUsuario/${produto.cd_produto}`}> Deletar </Link>
            </div >
        );

        
    }
}
