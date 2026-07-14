import { Router } from 'express';
import { postPedido } from '../src/controladores/pedidosCtrl.js';
//import { verificarJWT } from '../middlewares/verificarJWT.js';

const router = Router();

// proteger rutas
//router.use(verificarJWT);

// crear pedido completo
router.post('/pedidos', postPedido);

export default router;