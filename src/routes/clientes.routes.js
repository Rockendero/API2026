import md5 from 'md5';
import { conmysql } from '../db.js';

import {Router} from 'express'
import jwt from 'jsonwebtoken';
import { verificarJWT } from '../middlewares/verificarJWT.js';
import { verificarToken } from '../middlewares/verificarToken.js';
import {deleteClientes, getClientes,getClientesxid, patchClientes, postInsertarClientes, putClientes} from '../controladores/clientesCtrl.js'

const router=Router()
const SECRET = 'clave123';

router.post('/login', async (req, res) => {
    try {
        const { usuario, clave } = req.body;
        const [result] = await conmysql.query(
            'select * from usuarios where usr_usuario=?',
            [usuario]
        );
        if (result.length <= 0) {
            return res.status(401).json({
                mensaje: 'Usuario no existe'
            });
        }
        const usuarioBD = result[0];
        const claveEncriptada = md5(clave);
        if (usuarioBD.usr_clave !== claveEncriptada) {
            return res.status(401).json({
                mensaje: 'Clave incorrecta'
            });
        }
        const token = jwt.sign(
            {
                id: usuarioBD.usr_id,
                nombre: usuarioBD.usr_nombre
            },
            SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token, nombre: usuarioBD.usr_nombre });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error login'
        });
    }
});

//armar nuestras rutas
router.use(verificarJWT);
//router.use(verificarToken);

router.get('/clientes', getClientes);
router.get('/clientes/:id', getClientesxid);
router.post('/clientes', postInsertarClientes);
router.put('/clientes/:id', putClientes);
router.patch('/clientes/:id', patchClientes);
router.delete('/clientes/:id', deleteClientes);

export default router