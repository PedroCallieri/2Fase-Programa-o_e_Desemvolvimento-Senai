import React from 'react'
import './Cabeçalho.css'

function Cabeçalho(props) {
  return (
    <div>
        <header>
          <h1>{props.titulo}</h1>
        </header>
    </div>
  )
}

export default Cabeçalho
