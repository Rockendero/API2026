import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { verificarJWT } from '../middlewares/verificarJWT.js';
import { getProductos, getProductosxid, postInsertarProductos, putProductos, deleteProductos } from '../controladores/productosCtrl.js';

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'productos',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
  }
});

const upload = multer({ storage });

router.get('/productos', verificarJWT, getProductos);
router.get('/productos/:id', verificarJWT, getProductosxid);
router.post('/productos', verificarJWT, upload.single('imagen'), postInsertarProductos);
router.put('/productos/:id', verificarJWT, upload.single('imagen'), putProductos);
router.delete('/productos/:id', verificarJWT, deleteProductos);

export default router;