const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',       // seu usuário do MySQL
    password: 'senai',  // sua senha
    database: 'alug',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(cors());
app.use(express.json());


app.get('/usuario', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Usuario');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

app.get('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Usuario WHERE id_Usuario = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
});

app.post('/usuario', async (req, res) => {
    const { nome, email, telefone, senha, data_nascimento, url_imagem } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Usuario (nome, email, telefone, senha, data_nascimento, url_imagem) VALUES (?, ?, ?, ?, ?, ?)',
            [nome, email, telefone, senha, data_nascimento, url_imagem]
        );
        const [novoUsuario] = await pool.query('SELECT * FROM Usuario WHERE id_Usuario = ?', [result.insertId]);
        res.status(201).json(novoUsuario[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao adicionar usuário' });
    }
});

app.put('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, senha, data_nascimento, url_imagem } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE Usuario SET nome = ?, email = ?, telefone = ?, senha = ?, data_nascimento = ?, url_imagem = ? WHERE id_Usuario = ?',
            [nome, email, telefone, senha, data_nascimento, url_imagem, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
        const [usuarioAtualizado] = await pool.query('SELECT * FROM Usuario WHERE id_Usuario = ?', [id]);
        res.json(usuarioAtualizado[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});

app.delete('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM Usuario WHERE id_Usuario = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
});



app.get('/imoveis', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Imoveis');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar imóveis' });
    }
});

app.get('/imoveis/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Imoveis WHERE id_Imovel = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Imóvel não encontrado' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar imóvel' });
    }
});

app.post('/imoveis', async (req, res) => {
    const { titulo, tipo, area, quartos, banheiros, mobilia, numero_garagem, descricao, preco, url_imagem, Usuario_id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Imoveis (titulo, tipo, area, quartos, banheiros, mobilia, numero_garagem, descricao, preco, url_imagem, Usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [titulo, tipo, area, quartos, banheiros, mobilia, numero_garagem, descricao, preco, url_imagem, Usuario_id]
        );
        const [novoImovel] = await pool.query('SELECT * FROM Imoveis WHERE id_Imovel = ?', [result.insertId]);
        res.status(201).json(novoImovel[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao adicionar imóvel' });
    }
    
});

app.put('/imoveis/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, tipo, area, quartos, banheiros, mobilia, numero_garagem, descricao, preco, url_imagem, Usuario_id } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE Imoveis SET titulo = ?, tipo = ?, area = ?, quartos = ?, banheiros = ?, mobilia = ?, numero_garagem = ?, descricao = ?, preco = ?, url_imagem = ?, Usuario_id = ? WHERE id_Imovel = ?',
            [titulo, tipo, area, quartos, banheiros, mobilia, numero_garagem, descricao, preco, url_imagem, Usuario_id, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Imóvel não encontrado' });
        const [imovelAtualizado] = await pool.query('SELECT * FROM Imoveis WHERE id_Imovel = ?', [id]);
        res.json(imovelAtualizado[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar imóvel' });
    }
});

app.delete('/imoveis/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM Imoveis WHERE id_Imovel = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Imóvel não encontrado' });
        res.json({ message: 'Imóvel deletado com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar imóvel' });
    }
});

app.post('/login', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const [rows] = await pool.query(
            'SELECT * FROM usuario WHERE nome = ? AND email = ? AND senha = ?',
            [nome, email, senha]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Nome, email ou senha incorretos' });
        }

        res.json({ message: 'Login bem-sucedido', usuario: rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao tentar fazer login' });
    }
});




app.listen(3000, () => {
    console.log('✅ Servidor rodando na porta 3000');
});
