import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Cabecalho from "../../components/Cabecalho/Cabecalho";
import CardAnuncio from "../../components/CardAnuncio/CardAnuncio";
import "./Home.css";

function Home() {
  const [imoveis, setImoveis] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await axios.get("http://localhost:3000/imoveis");
        setImoveis(resposta.data);
      } catch (erro) {
        console.log("Erro ao carregar imóveis:", erro);
      }
    }
    carregar();
  }, []);

  function abrirAnuncio(id) {
    navigate(`/informacoes-anuncio/${id}`);
  }

  return (
    <div>
      <Cabecalho />

      <div className="home-container">
        <h1>Imóveis disponíveis</h1>

        <div className="cards-container">
          {imoveis.map((item) => (
            <CardAnuncio
              key={item.id_imoveis}
              dados={item}
              onClick={() => abrirAnuncio(item.id_imoveis)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
