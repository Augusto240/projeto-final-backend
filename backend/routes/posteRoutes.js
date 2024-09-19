import express from 'express';
import { 
  createPoste, 
  getAllPoste, 
  getPosteByIdUser, 
  updatePoste, 
  deletePoste 
} from '../controllers/posteController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { Upload } from '../middlewares/fotoMiddleware.js';

const router = express.Router();

router.post('/poste/:id', verificarToken, Upload.single('foto'), createPoste);
router.get('/poste', getAllPoste);
router.get('/poste/:idUsuario', getPosteByIdUser);
router.put('/poste/:id', verificarToken, Upload.single('foto'), updatePoste);
router.delete('/poste/:id', verificarToken, deletePoste);

export default router;
