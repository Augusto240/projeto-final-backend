import Poste from '../models/poste.js';

export const createPoste = async (req, res) => {
  const { descricao } = req.body;
  const foto = req.file ? req.file.path : null;
  const idUsuario = req.params.id;

  // Validação de entradas
  if (!descricao || !foto) {
    return res.status(400).json({ error: 'Descrição e foto são obrigatórios.' });
  }

  try {
    const poste = await Poste.create({ foto, descricao, idUsuario });
    res.status(201).json({ message: 'Postagem criada com sucesso.', poste });
  } catch (error) {
    console.error('Erro ao criar postagem:', error); // Logar erro
    res.status(500).json({ error: 'Erro ao processar a solicitação. Tente novamente.' });
  }
};


export const getAllPoste = async (req, res) => {
  try {
    const poste = await Poste.findAll();
    res.json(poste);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getPosteByIdUser = async (req, res) => {
  const  {idUsuario}  = req.params;

  try {
    const poste = await Poste.findAll( { where: {idUsuario} } );
    res.json(poste);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePoste = async (req, res) => {
  const { id } = req.params;
  const {descricao} = req.body;
  const foto = req.file ? req.file.path : null;

  try {
    const poste = await Poste.findByPk(id);
    if (!poste) {
      return res.status(404).json({ mensagemerro: 'Produto não encontrado' });
    }

    await poste.update({ foto, descricao });
    res.json({ mensagem: 'Produto atualizado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePoste = async (req, res) => {
  const { id } = req.params;

  try {
    const poste = await Poste.findByPk(id);
    if (!poste) {
      return res.status(404).json({ mensagemerro: 'Produto não encontrado' });
    }

    await poste.destroy();
    res.json({ mensagem: 'Produto excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
