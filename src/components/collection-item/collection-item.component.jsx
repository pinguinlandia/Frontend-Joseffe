import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component.jsx';
import { addItem }from '../../redux/cart/cart.actions.js';
 
import './collection-item.styles.scss';


const CollectionItem = ({item, addItem}) => {
    const {nm_produto, vl_preco_produto, nm_path_foto} = item;
    return (
      <div className="collection-item">
        <div
          className="image"
          style={{
            backgroundImage: `url(${nm_path_foto})`
          }}
        />
        <div className="collection-footer">
          <span className="name"> {nm_produto} </span>
          <span className="price"> {vl_preco_produto} </span>
        </div>

        <CustomButton onClick={ () =>  addItem(item)} inverted>Comprar</CustomButton>
      
      </div>
    );
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps) (CollectionItem);