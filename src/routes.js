import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MenuProdutos from './pages/Produtos/main';
import DetalhesProdutos from './pages/Produtos/detalhes/index';
import CriarProdutos from './pages/Produtos/criar/index';
import EditarProdutos from './pages/Produtos/editar/index';
import DeletarProduto from './pages/Produtos/deletar/index';

import MenuClientes from './pages/Clientes/main';
import DetalhesClientes from './pages/Clientes/detalhes/index';
import CriarClientes from './pages/Clientes/criar/index';
import EditarClientes from './pages/Clientes/editar/index';
import DeletarClientes from './pages/Clientes/deletar';

import MenuPedidos from './pages/Pedidos/main';
import CriarPedidos from './pages/Pedidos/criar/index';
import DetalhesPedidos from './pages/Pedidos/detalhes/index';
import EditarPedidos from './pages/Pedidos/editar/index';
import DeletarPedidos from './pages/Pedidos/deletar';

 
const Routes = () => (
 
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={MenuProdutos} />
            <Route path="/criarProdutos" component={CriarProdutos} />
            <Route path="/produtos/:cd_produto" component={DetalhesProdutos} />
            <Route path="/editarProdutos/:cd_produto" component={EditarProdutos} />
            <Route path="/deletarProduto/:cd_produto" component={DeletarProduto} />

            <Route exact path="/clientes" component={MenuClientes} />
            <Route path="/criarClientes" component={CriarClientes} />
            <Route path="/clientes/:cd_cliente" component={DetalhesClientes} />
            <Route path="/editarClientes/:cd_cliente" component={EditarClientes} />
            <Route path="/deletarClientes/:cd_cliente" component={DeletarClientes} />

            <Route exact path="/pedidos" component={MenuPedidos} />
            <Route path="/criarPedidos" component={CriarPedidos} />
            <Route path="/pedidos/:cd_pedido" component={DetalhesPedidos} />
            <Route path="/editarPedidos/:cd_pedido" component={EditarPedidos} />
            <Route path="/deletarPedidos/:cd_pedido" component={DeletarPedidos} />
            
        </Switch>
    </BrowserRouter>
)
 
export default Routes;
