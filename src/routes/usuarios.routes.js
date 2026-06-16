import md5 from 'md5';
import { conmysql } from '../db.js';
import {Router} from 'express'
import jwt from 'jsonwebtoken';
import { verificarJWT } from '../middlewares/verificarJWT.js';
import { verificarToken } from '../middlewares/verificarToken.js';
import {getUsuarios} from '../controladores/usuariosCtrl.js'

const router=Router()

const SECRET = 'clave123';

router.use(verificarJWT);


router.get('/usuarios', getUsuarios);

export default router