import React from 'react'
import './Corpo.css'
import Cabeçalho from './componetes/Treino props/Cabeçalho'
import Conteudo from './componetes/Treino props/Conteudo'
import Footer from './componetes/Treino props/Footer'
import Perfil from './componetes/treino templetes/Perfil'
import BoasVindas from './componetes/Atividade Props|Templetes|Condicionais/BoasVindas'
import Botao from './componetes/Treino Eventos e Cliques/Botao'

function Corpo() {
  return (
    <div className='corpo'>
      <header>
        <h1>Treino Props</h1>
      </header>

      <div className="testes">
        <div className='teste1'>
            <Cabeçalho titulo="Basíco teste 1"/>
            <Conteudo texto=" esse texto é apenas um teste 1 para um treino com props"/>
            <Footer autor="Pedro"/>
        </div>
        <div className='teste2'>
            <Cabeçalho titulo="Basíco teste 2"/>
            <Conteudo texto=" esse texto é apenas um teste 2 para um treino com props"/>
            <Footer autor="Gabriel"/>
        </div>
        <div className='teste3'>
            <Cabeçalho titulo="Basíco teste 3"/>
            <Conteudo texto=" esse texto é apenas um teste 3 para um treino com props"/>
            <Footer autor="G.Caleiros"/>
        </div>
      </div>
      <h1>Treino Templestes</h1>
      <div className='Templestes'>
        <Perfil nome="Pedro Gabriel" idade={19} cidade="Salvador"/>
      </div>
      <h1>Ativiadade Templetes+Props</h1>
      <div className='Ativ'>
        <BoasVindas nome="Pedro" horario={12} cidade="Cuiaba" logado={true}/>
      </div>
      <h1>Treino Botão</h1>
      <div className='bot'>
        <Botao/>
      </div>
    </div>
  )
}

export default Corpo
