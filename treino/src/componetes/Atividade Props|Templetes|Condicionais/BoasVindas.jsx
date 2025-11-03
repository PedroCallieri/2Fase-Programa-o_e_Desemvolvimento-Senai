import React from 'react'
import './BoasVindas.css'

function BoasVindas({nome, horario, cidade, logado}) {
  return (
    <div className='BoasVindas'>
        <div>
      {horario < 12 && <h1>Bom Dia {nome} </h1> }
      {horario >= 12 && horario < 18 && <h1>Boa Tarde {nome}</h1> }
      {horario >= 18 &&<h1>Boa Noite {nome}</h1> }

      <p>
        {logado
          ? `Que bom te ver novamente direto de ${cidade}!`
          : 'Você precisa fazer login para continuar.'}
      </p>
        </div>
    </div>
  )
}

export default BoasVindas
