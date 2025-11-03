import React from 'react'

function Botao() {
    function piada(){
        alert("O que o cadarço falou para o tênis?Estou amarradão em você!");
    }
    function consolar(){
        console.log("é isso ai...");
    }
    function magica(){
        const paragrafo = document.querySelector("#mensagem");
        paragrafo.textContent = "Cabou a criatividade..."
    }

  return (
    <div >
      <button onClick={piada}>Quer uma Piada</button>
      <button onClick={consolar}>Olha no Console</button>
      <button onClick={magica}>Magica do Texto</button>

      <p id='mensagem'>O que é que a vida tem? O que é que a vida tem? <br />
        Nada, nada, nada. Nada. Nada tem, nada.</p>
    </div>
  )
}

export default Botao
