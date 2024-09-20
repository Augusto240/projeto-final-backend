const secretWord = process.env.ACCESS_TOKEN_SECRET || 'IFRN2@24'; // Use variável de ambiente preferencialmente

export const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ mensagemerro: 'Token não fornecido. Faça login.' });
  }

  jwt.verify(token, secretWord, (error, decoded) => {
    if (error) {
      return res.status(403).json({ mensagemerro: 'Token inválido. Faça login novamente.' });
    }

    req.user = decoded; // Salva o usuário decodificado no request
    next();
  });
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ mensagemerro: 'Token não fornecido. Faça login.' });

  jwt.verify(token, secretWord, (err, user) => {
    if (err) return res.status(403).json({ mensagemerro: 'Token inválido. Faça login novamente.' });
    req.user = user; // Define o usuário no req
    next();
  });
};
