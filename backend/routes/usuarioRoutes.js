import express from 'express';
import { registrarUsuario, login, logout, getAllUsuario, getUsuarioById, updateUsuario, deleteUsuario } from '../controllers/usuarioController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { Upload } from '../middlewares/fotoMiddleware.js';
import authenticateToken from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/usuarios/:id', authenticateToken, getUsuarioById);
router.post('/criar', Upload.single('foto'),registrarUsuario);
router.post('/login', login);
router.post('/logout', logout);
router.get('/perfil', verificarToken, getUsuarioById);
router.get('/usuario', verificarToken, getAllUsuario);
router.get('/usuario/:id', verificarToken, getUsuarioById);
router.put('/usuario/:id', verificarToken, Upload.single('foto'), updateUsuario);
router.delete('/usuario/:id', verificarToken, deleteUsuario);


// Obter um usuário por ID
router.get('/usuarios/:id', getUsuarioById);

// Atualizar um usuário por ID
router.put('/usuarios/:id', updateUsuario);

// Excluir um usuário por ID
router.delete('/usuarios/:id', deleteUsuario);

export default router;
