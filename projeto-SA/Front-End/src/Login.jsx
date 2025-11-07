import { useState } from 'react'
import axios from 'axios'
import React from 'react'
import './Login.css'

function Login() {
    const  [email, setEmail] = useState ('');
    const  [senha, setSenha] = useState ('');
    const  [nome, setNome] = useState ('');
    const [mensagem, setMensagem] = useState('');
    

    
  const Logar = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        nome,
        email,
        senha
      });

      setMensagem(response.data.message);
      console.log('Usuário logado:', response.data.usuario);


    } catch (error) {
      if (error.response) {
        setMensagem(error.response.data.message || 'Erro ao fazer login');
      } else {
        setMensagem('Erro de conexão com o servidor');
      }
    }
  };


    return (
        <div className='Conteiner_Tela'>
            <form onSubmit={Logar}>
                <h2>Logar com sua conta</h2>

                <div className='Conteiner_forms'>
                    <label htmlFor="">Nome</label>
                    <input
                        type="text"
                        placeholder='Mariana Pereira'
                        onChange={(e) => setNome (e.target.value)}
                    />

                    <label htmlFor="">Email</label>
                    <input
                        type="E-mail"
                        placeholder='usuario@gmail.com'
                        onChange={(e) => setEmail (e.target.value)}
                    />

                    <label htmlFor="">Senha</label>
                    <input
                        type="password"
                        placeholder='123456789'
                        onChange={(e) => setSenha (e.target.value)}
                    />
                </div>

                <div> 
                    <label>
                        <input type="checkbox" />
                        Salvar minha conta?
                    </label>
                </div>

                <button onClick={Logar}>Entrar</button>

                <div>
                    <p>Não tenho conta?<a href="">Cadastrar</a> </p>
                </div>

            </form>
        </div>
    )
}

export default Login
