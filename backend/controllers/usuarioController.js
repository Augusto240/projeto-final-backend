import Usuario from '../models/usuarios.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const secretWord = 'IFRN2@24';

function encriptarSenha(senha) {
  return crypto.createHash('sha256').update(senha + secretWord).digest('hex');
}

function gerarToken(payload) {
  return jwt.sign(payload, secretWord, { expiresIn: '3h' });
}

export const registrarUsuario = async (req, res) => {
  const { nome, email, senha} = req.body;
  const foto = req.file ? req.file.path : null;
  const senhaCriptografada = encriptarSenha(senha);

  try {
    const usuario = await Usuario.create({ nome, email, senha: senhaCriptografada, foto });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, senha } = req.body;
  const senhaCriptografada = encriptarSenha(senha);
  
  try {
    const usuario = await Usuario.findOne({ where: { email, senha: senhaCriptografada } });
    
    if (!usuario) {
      return res.status(403).json({ mensagemerro: 'Usuário ou senha inválidos' });
    }

    const token = gerarToken({ id: usuario.id, nome: usuario.nome });
    res.json({ acessToken: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  // Simplesmente retorna uma mensagem de logout
  return res.status(200).json({ mensagem: 'Logout realizado com sucesso' });
};


export const getAllUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findAll();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export async function getUsuarioById(req, res) {
  const userId = req.user.id; // Pega o ID do usuário do token
  try {
    const usuario = await Usuario.findOne({ where: { id: userId } });
    if (!usuario) return res.status(404).send('Usuário não encontrado');
    res.json(usuario);
  } catch (error) {
    res.status(500).send('Erro ao buscar usuário');
  }
  console.log('req.user:', req.user);
  console.log('req.params.id:', req.params.id);

}






export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  const foto = req.file ? req.file.path : null;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensagemerro: 'Usuário não encontrado' });
    }

    // Atualiza apenas os campos fornecidos
    const updateData = {};
    if (nome) updateData.nome = nome;
    if (email) updateData.email = email;
    if (senha) updateData.senha = encriptarSenha(senha);
    if (foto) updateData.foto = foto;


    await usuario.update(updateData);

    res.json({ mensagem: 'Usuário atualizado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensagemerro: 'Usuário não encontrado' });
    }

    await usuario.destroy();
    res.json({ mensagem: 'Usuário excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
