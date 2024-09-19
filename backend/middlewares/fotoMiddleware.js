import multer from 'multer';
import path from 'path';


const createStorage = () => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads`);  
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}${ext}`;
      cb(null, filename);  
    },
  });
};


const Upload = multer({
  storage: createStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },  
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Tipo de arquivo inválido.'));
  },
});


export { Upload };