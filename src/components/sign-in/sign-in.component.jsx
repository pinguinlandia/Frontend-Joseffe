import React from 'react';
 
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {signInWithGoogle} from '../../firebase/firebase.utils.js';
import './sign-in.styles.scss';

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state ={
          nm_login: '',
          nm_senha: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        //const {email, password} = this.state;

        try{
          fetch("http://localhost:3003/sistema/logar",{
            method: "post",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            }
          })
          .then(data => {
            data.json().then(data=> {
              this.setState({nm_cliente: data[0]['nm_cliente']});
            });
          })
          .catch(erro => this.setState({ erro: erro }));
          //await auth.signInWithEmailAndPassword(email, password);
          //this.setState({ email: "", password: "" });
        }catch(error){
          console.log(error)
        }
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    }

    render(){
        return (
          <div className="sign-in">
            <h2>Já tenho uma conta</h2>
            <span>Entre com o seu email e sua senha</span>

            <form onSubmit={this.handleSubmit}>
              <FormInput
                name="nm_login"
                type="text"
                handleChange={this.handleChange}
                value={this.state.nm_login}
                label="Login"
                required
              />

              <FormInput
                name="nm_senha"
                type="password"
                value={this.state.nm_senha}
                handleChange={this.handleChange}
                label="Senha"
                required
              />
              <div className='buttons' >
                <CustomButton type="submit"> Entrar </CustomButton>
                <CustomButton onClick={signInWithGoogle} isGoogleSignIn > Usar conta Google </CustomButton>
              </div>
            </form>
          </div>
        );
    }
}

export default SignIn;