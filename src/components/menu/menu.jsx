import React from 'react';

import './menu.css';
 
const Menu = () => (
    <div className='menu-header'>        
        <a class="menuNomes" href="/">Produtos</a>
        <a className="menuNomes" href="/clientes">Clientes</a>    
        <a className="menuNomes" href="/pedidos">Pedidos</a>  
    </div>
    
);
 
export default Menu;
