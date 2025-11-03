import React from 'react'

function Perfil({nome, idade, cidade}) {
  return (
    <div>
        <h1>Olá {nome}</h1>
        <p>Serio que você tem {idade}?Nem parece</p>
        <p>Adivinha? eu também moro em {cidade}</p>
      {idade >= 18 ? "Você é maior de idade!" : "Você e menor de idade!"}
    </div>
  )
}

export default Perfil
