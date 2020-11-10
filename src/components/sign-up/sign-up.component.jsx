import React from 'react';
import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';


//import { auth, createUserProfileDocument } from '../../firebase/firebase.utils.js'

import './sign-up.styles.scss'; 

class SignUp extends React.Component{
    constructor(){
        super();

        this.state = {
          nm_cliente: '',
          cd_cpf: '',
          cd_rg: '',
          nm_login: '',
          nm_senha: '',
          confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {nm_senha, confirmPassword } = this.state;

        if(nm_senha !== confirmPassword){
            alert("As senhas não coincidem")
            return;
        }

        try{
            //const {user} = await auth.createUserWithEmailAndPassword(
              //  email, 
                //password
            //)
            //await createUserProfileDocument(user,{ displayName})
            fetch(`${process.env.REACT_APP_API_URL}/sistema/clientes`, {
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
              nm_cliente: '',
              cd_cpf: '',
              cd_rg: '',
              nm_login: '',
              nm_senha: '',
              confirmPassword: ''
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
        const {nm_cliente, nm_login, cd_cpf, cd_rg, nm_senha, confirmPassword } = this.state
        return (
          <div className="sign-up">
            <h2 className="title">Não tenho uma conta</h2>
            <span>Entre com seu email e senha</span>
            <form className="sign-up-form" onSubmit={this.handleSubmit}>
             
              <FormInput
                type="text"
                name="nm_cliente"
                value={nm_cliente}
                onChange={this.handleChange}
                label="Nome Completo"
                required
              />

              <FormInput
                type="text"
                name="nm_login"
                value={nm_login}
                onChange={this.handleChange}
                label="Login"
                required
              />

              <FormInput
                type="cpf"
                name="cd_cpf"
                value={cd_cpf}
                onChange={this.handleChange}
                label="CPF"
                required
              />

              <FormInput
                type="rg"
                name="cd_rg"
                value={cd_rg}
                onChange={this.handleChange}
                label="Rg"
                required
              />

              <FormInput
                type="password"
                name="nm_senha"
                value={nm_senha}
                onChange={this.handleChange}
                label="Senha"
                required
              />

              <FormInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
                label="Confirmar Senha"
                required
              />

              <CustomButton type='submit'>Entrar</CustomButton>
            </form>
          </div>
        );
    }
}

export default SignUp;