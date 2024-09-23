import express from 'express';
import { 
  createPoste, 
  getAllPoste, 
  getPosteByIdUser, 
  updatePoste, 
  deletePoste 
} from '../controllers/posteController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/poste/:id', verificarToken, createPoste);
router.get('/poste', getAllPoste);
router.get('/poste/:idUsuario', getPosteByIdUser);
router.put('/poste/:id', verificarToken, updatePoste);
router.delete('/poste/:id', verificarToken, deletePoste);

export default router;
