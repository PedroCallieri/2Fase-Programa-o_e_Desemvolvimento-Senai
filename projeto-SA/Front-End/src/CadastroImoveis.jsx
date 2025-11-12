import { useState } from 'react'
import axios from 'axios'
import React from 'react'
import './CadastroImoveis.css'

function CadastroImoveis() {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('');
  const [area, setArea] = useState('');
  const [quartos, setQuartos] = useState('');
  const [banheiros, setBanheiros] = useState('');
  const [mobilia, setMobilia] = useState('');
  const [numeroGaragem, setNumeroGaragem] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [cep, setCep] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [urlImagem, setUrlImagem] = useState('');
  const [mensagem, setMensagem] = useState('');

  // 🔎 Busca o CEP automaticamente
  const buscarCep = async () => {
    if (cep.length !== 8) {
      alert('Digite um CEP válido com 8 dígitos');
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        alert('CEP não encontrado');
        return;
      }

      setRua(response.data.logradouro);
      setBairro(response.data.bairro);
      setCidade(response.data.localidade);
      setEstado(response.data.uf);
    } catch (error) {
      alert('Erro ao buscar o CEP');
      console.error(error);
    }
  };

  // 🏠 Cadastrar imóvel no banco
  const CadastrarImoveis = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/imoveis', {
        titulo,
        tipo,
        area,
        quartos,
        banheiros,
        mobilia,
        numero_garagem: numeroGaragem,
        estado,
        cidade,
        bairro,
        rua,
        numero,
        cep,
        descricao,
        preco,
        url_imagem: urlImagem
      });

      setMensagem('✅ Imóvel cadastrado com sucesso!');
      console.log('Novo imóvel cadastrado:', response.data);

      // limpa os campos
      setTitulo('');
      setTipo('');
      setArea('');
      setQuartos('');
      setBanheiros('');
      setMobilia('');
      setNumeroGaragem('');
      setEstado('');
      setCidade('');
      setBairro('');
      setRua('');
      setNumero('');
      setCep('');
      setDescricao('');
      setPreco('');
      setUrlImagem('');
    } catch (error) {
      console.error(error);
      setMensagem('❌ Erro ao cadastrar imóvel');
    }
  };

  return (
    <div className="container-imovel">
      <form onSubmit={CadastrarImoveis}>
        <h2>Cadastre seu Imóvel</h2>

        <div>
          <label>Título do Anúncio</label>
          <input
            type="text"
            placeholder="Casa na Frente da Praia"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
          <br />

          <label>Tipo de imóvel</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
            <option value="">Selecione...</option>
            <option value="Casa">Casa</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Kitnet">Kitnet</option>
          </select>
          <br />

          <label>Tamanho (m²)</label>
          <input
            type="number"
            placeholder="Ex: 85"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />
          <br />

          <label>Quartos</label>
          <input
            type="number"
            value={quartos}
            onChange={(e) => setQuartos(e.target.value)}
            required
          />
          <br />

          <label>Banheiros</label>
          <input
            type="number"
            value={banheiros}
            onChange={(e) => setBanheiros(e.target.value)}
            required
          />
          <br />

          <label>Possui mobília?</label>
          <select value={mobilia} onChange={(e) => setMobilia(e.target.value)}>
            <option value="">Selecione...</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
          <br />

          <label>Vagas na garagem</label>
          <input
            type="number"
            value={numeroGaragem}
            onChange={(e) => setNumeroGaragem(e.target.value)}
          />
          <br />

          <label>CEP</label>
          <input
            type="text"
            placeholder="Ex: 88000000"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            onBlur={buscarCep} // quando sair do campo, busca o CEP
          />
          <br />

          <label>Rua</label>
          <input
            type="text"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
          />
          <br />

          <label>Bairro</label>
          <input
            type="text"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
          <br />

          <label>Cidade</label>
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
          <br />

          <label>Estado</label>
          <input
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
          <br />

          <label>Número</label>
          <input
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
          <br />

          <label>Preço (R$)</label>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
          <br />

          <label>URL da imagem</label>
          <input
            type="text"
            placeholder="Cole o link da imagem"
            value={urlImagem}
            onChange={(e) => setUrlImagem(e.target.value)}
          />
          <br />

          <label>Descrição</label>
          <textarea
            placeholder="Fale sobre o imóvel..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <button type="submit">Cadastrar Imóvel</button>

        <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{mensagem}</p>
      </form>
    </div>
  );
}

export default CadastroImoveis;
