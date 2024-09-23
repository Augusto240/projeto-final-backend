import Poste from '../models/poste.js';

// Criação de postagem
export const createPoste = async (req, res) => {
  const { descricao } = req.body;
  const idUsuario = req.params.id;

  // Validação de entrada (apenas descrição é obrigatória)
  if (!descricao) {
    return res.status(400).json({ error: 'A descrição é obrigatória.' });
  }

  try {
    const poste = await Poste.create({descricao, idUsuario });
    res.status(201).json({ message: 'Postagem criada com sucesso.', poste });
  } catch (error) {
    console.error('Erro ao criar postagem:', error);
    res.status(500).json({ error: 'Erro ao processar a solicitação. Tente novamente.' });
  }
};

// Listar todos os postes
export const getAllPoste = async (req, res) => {
  try {
    const postes = await Poste.findAll();
    res.json(postes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar postes por ID de usuário
export const getPosteByIdUser = async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const postes = await Poste.findAll({ where: { idUsuario } });
    res.json(postes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar postagem
export const updatePoste = async (req, res) => {
  const { id } = req.params;
  const { descricao } = req.body;

  try {
    const poste = await Poste.findByPk(id);
    if (!poste) {
      return res.status(404).json({ error: 'Postagem não encontrada.' });
    }

    // Atualizar apenas os campos fornecidos
    await poste.update({
      descricao: descricao || poste.descricao, // Mantém a descrição atual se não for fornecida
    });

    res.json({ message: 'Postagem atualizada com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Excluir postagem
export const deletePoste = async (req, res) => {
  const { id } = req.params;

  try {
    const poste = await Poste.findByPk(id);
    if (!poste) {
      return res.status(404).json({ error: 'Postagem não encontrada.' });
    }

    await poste.destroy();
    res.json({ message: 'Postagem excluída com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
