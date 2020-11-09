import React from 'react';
 
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './criar.styles.scss';

class Criar extends React.Component{
    constructor(){
        super();

        this.state = {
            nm_produto: '',
            vl_preco_produto: '',
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        try{            
            fetch("http://localhost:3003/sistema/produtos", {
              method: "post",
              body: JSON.stringify(this.state),
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

            this.setState({
                nm_produto: '',
                vl_preco_produto: '',
            });

        }catch(error){
            console.error(error);
        }
    }

    handleChange = event => {
        const {name, value} = event.target
        this.setState({[name]: value});
    }

    render(){
        const { nm_produto, vl_preco_produto } = this.state
        return (
          <div className="sign-up">
            <h2 className="title">Cadastrar Produto</h2>            
            <form className="sign-up-form" onSubmit={this.handleSubmit}>
             
              <FormInput
                type="text"
                name="nm_produto"
                value={nm_produto}
                onChange={this.handleChange}
                label="Nome do Produto"
                required
              />

              <FormInput
                type="text"
                name="vl_preco_produto"
                value={vl_preco_produto}
                onChange={this.handleChange}
                label="Valor do Produto"
                required
              />

              <CustomButton type='submit'>Cadastrar</CustomButton>
            </form>
          </div>
        );
    }
}
export default Criar;