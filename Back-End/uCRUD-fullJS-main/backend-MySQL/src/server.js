const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',        // altere para seu usuário
    password: 'senai',   // altere para sua senha
    database: 'alug',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(cors());
app.use(express.json());


app.get('/usuario', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuario');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar usuario' });
    }
});

app.get('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Usuario não encontrado' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar usuario' });
    }
});

app.post('/usuario', async (req, res) => {
    const { nome, endereco, email, telefone, url_imagens } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO usuario (nome, endereco, email, telefone, url_imagens) VALUES (?, ?, ?, ?, ?)',
            [nome, endereco, email, telefone, url_imagens]
        );
        const [novoUsuario] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [result.insertId]);
        res.status(201).json(novoUsuario[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar usuario' });
    }
});

app.put('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, endereco, email, telefone, url_imagens } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE usuario SET nome = ?, endereco = ?, email = ?, telefone = ?, url_imagens = ? WHERE id_usuario = ?',
            [nome, endereco, email, telefone, url_imagens, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario não encontrado' });
        const [usuarioAtualizado] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
        res.json(usuarioAtualizado[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar usuario' });
    }
});

app.delete('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario não encontrado' });
        res.json({ message: 'Usuario deletado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar usuario' });
    }
});

app.get('/imoveis', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Imoveis');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar imovel' });
    }
});

app.get('/imoveis/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Imoveis WHERE id_Imoveisb = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Imovel não encontrado' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar Imovel' });
    }
});

app.post('/imoveis', async (req, res) => {
    const { titulo, descricao, preco, cidade, bairro, url_imagem, usuario_id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Imoveis (titulo, descricao, preco, cidade, bairro, url_imagem, Usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [titulo, descricao, preco, cidade, bairro, url_imagem, usuario_id]
        );
        const [novoImovel] = await pool.query('SELECT * FROM Imoveis WHERE id_Imoveisb = ?', [result.insertId]);
        res.status(201).json(novoImovel[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar imovel' });
    }
});

app.put('/imoveis/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, preco, cidade, bairro, url_imagem, usuario_id } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE Imoveis SET titulo = ?, descricao = ?, preco = ?, cidade = ?, bairro = ?, url_imagem = ?, Usuario_id = ? WHERE id_Imoveisb = ?',
            [titulo, descricao, preco, cidade, bairro, url_imagem, usuario_id, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Imovel não encontrado' });
        const [imovelAtualizado] = await pool.query('SELECT * FROM Imoveis WHERE id_Imoveisb = ?', [id]);
        res.json(imovelAtualizado[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar imovel' });
    }
});

app.delete('/imoveis/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM Imoveis WHERE id_Imoveisb = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Imovel não encontrado' });
        res.json({ message: 'Imovel deletado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar imovel' });
    }
});

 

app.get('/anunciante', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM anunciante');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar anunciante' });
    }
});

app.get('/anunciante/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM anunciante WHERE id_anunciante = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Anunciante não encontrado' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar anunciante' });
    }
});

app.post('/anunciante', async (req, res) => {
    const { cpf, endereco, usuario_id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO anunciante (cpf, endereco, usuario_id) VALUES (?, ?, ?)',
            [cpf, endereco, usuario_id]
        );
        const [novoAnunciante] = await pool.query('SELECT * FROM anunciante WHERE id_anunciante = ?', [result.insertId]);
        res.status(201).json(novoAnunciante[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar anunciante' });
    }
});

app.put('/anunciante/:id', async (req, res) => {
    const { id } = req.params;
    const { cpf, endereco, usuario_id } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE anunciante SET cpf = ?, endereco = ?, usuario_id = ? WHERE id_anunciante = ?',
            [cpf, endereco, usuario_id, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Anunciante não encontrado' });
        const [anuncianteAtualizado] = await pool.query('SELECT * FROM anunciante WHERE id_anunciante = ?', [id]);
        res.json(anuncianteAtualizado[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar anunciante' });
    }
});

app.delete('/anunciante/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM anunciante WHERE id_anunciante = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Anunciante não encontrado' });
        res.json({ message: 'Anunciante deletado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar anunciante' });
    }
});


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
