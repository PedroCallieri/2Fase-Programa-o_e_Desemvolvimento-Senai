import { useState } from 'react'
import axios from 'axios'
import React from 'react'
import './Cadastro.css'

function Cadastro() {
  const [nomeCad, setCadNome] = useState('')
  const [emailCad, setCadEmail] = useState('')
  const [senhaCad, setCadSenha] = useState('')
  const [telefoneCad, setCadTelefone] = useState('')
  const [dataNascimento, setCadDataNasc] = useState('')
  const [urlImagem, setCadUrlImagem] = useState('')
  const [mensagem, setMensagem] = useState('')

  const Cadastrar = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/usuario', {
        nome: nomeCad,
        email: emailCad,
        senha: senhaCad,
        telefone: telefoneCad,
        data_nascimento: dataNascimento,
        url_imagem: urlImagem
      })

      setMensagem('✅ Usuário cadastrado com sucesso!')
      console.log('Novo usuário cadastrado:', response.data)

      // limpa os campos
      setCadNome('')
      setCadEmail('')
      setCadSenha('')
      setCadTelefone('')
      setCadDataNasc('')
      setCadUrlImagem('')

      // opcional: redirecionar pro login
      // window.location.href = '/login'

    } catch (error) {
      console.error(error)
      setMensagem('❌ Erro ao cadastrar usuário')
    }
  }

  return (
    <div className='conteiner'>
      <form onSubmit={Cadastrar}>
        <h2>Cadastre-se aqui</h2>
        <div>
          <label>NOME</label>
          <input
            type="text"
            placeholder="Maria José"
            value={nomeCad}
            onChange={(e) => setCadNome(e.target.value)}
          />
          <br />

          <label>E-MAIL</label>
          <input
            type="email"
            placeholder="usuario@gmail.com"
            value={emailCad}
            onChange={(e) => setCadEmail(e.target.value)}
          />
          <br />

          <label>SENHA</label>
          <input
            type="password"
            placeholder="12345678"
            value={senhaCad}
            onChange={(e) => setCadSenha(e.target.value)}
          />
          <br />

          <label>TELEFONE</label>
          <input
            type="text"
            placeholder="(48) 9 9999-9999"
            value={telefoneCad}
            onChange={(e) => setCadTelefone(e.target.value)}
          />
          <br />

          <label>DATA DE NASCIMENTO</label>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setCadDataNasc(e.target.value)}
          />
          <br />

          <label>URL DA IMAGEM (opcional)</label>
          <input
            type="text"
            placeholder="Cole o link da imagem"
            value={urlImagem}
            onChange={(e) => setCadUrlImagem(e.target.value)}
          />
        </div>

        <button type="submit">Cadastrar</button>

        <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{mensagem}</p>

        <div>
          <p>Já possui conta? <a href="/login">Voltar</a></p>
        </div>
      </form>
    </div>
  )
}

export default Cadastro
