import express from 'express';
import multer from 'multer';
import path from 'path';
import { verificarJWT } from '../middlewares/verificarJWT.js';
import { getProductos, getProductosxid, postInsertarProductos, putProductos, deleteProductos } from '../controladores/productosCtrl.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/img/productos/');
  },
  filename: (req, file, cb) => {
    const nombre = Date.now() + path.extname(file.originalname);
    cb(null, nombre);
  }
});

const upload = multer({ storage });

router.get('/productos', verificarJWT, getProductos);
router.get('/productos/:id', verificarJWT, getProductosxid);
router.post('/productos', verificarJWT, upload.single('imagen'), postInsertarProductos);
router.put('/productos/:id', verificarJWT, upload.single('imagen'), putProductos);
router.delete('/productos/:id', verificarJWT, deleteProductos);

export default router;