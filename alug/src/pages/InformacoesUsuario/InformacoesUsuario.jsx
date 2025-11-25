import React, { useEffect, useState } from "react";
import "./InformacoesUsuario.css";

function InformacoesUsuario() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
      setNome(userData.nome);
      setEmail(userData.email);
      setSenha(userData.senha);
    }
  }, []);

  if (!user) {
    return <div className="perfil-container">Nenhum usuário logado.</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleDelete = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const newList = users.filter((u) => u.id !== user.id);
    localStorage.setItem("users", JSON.stringify(newList));

    localStorage.removeItem("user");
    alert("Conta deletada!");
    window.location.href = "/login";
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      nome,
      email,
      senha,
    };

    // salva no "user" (usuário logado)
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // salva na lista de usuários (se existir)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex((u) => u.id === user.id);

    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }

    setUser(updatedUser);
    setEditMode(false);
    alert("Informações atualizadas!");
  };

  return (
    <div className="perfil-container">
      <h1>Olá, {user.nome}</h1>

      <div className="perfil-card">

        {!editMode ? (
          <>
            <p><strong>Nome:</strong> {user.nome}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Senha:</strong> {user.senha}</p>
          </>
        ) : (
          <>
            <label>Nome:</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} />

            <label>Email:</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Senha:</label>
            <input
              type="text"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <button className="btn-save" onClick={handleSave}>Salvar</button>
            <button className="btn-cancel" onClick={() => setEditMode(false)}>
              Cancelar
            </button>
          </>
        )}
      </div>

      {!editMode && (
        <div className="perfil-buttons">
          <button className="btn-edit" onClick={() => setEditMode(true)}>
            Editar Perfil
          </button>
          <button className="btn-delete" onClick={handleDelete}>Deletar Conta</button>
          <button className="btn-logout" onClick={handleLogout}>Sair</button>
        </div>
      )}
    </div>
  );
}

export default InformacoesUsuario;

