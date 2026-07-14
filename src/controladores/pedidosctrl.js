//id del cliente y id del pedido
import { conmysql } from '../db.js';

/**
 * CREAR PEDIDO COMPLETO
 * cliente + pedido + detalle
 */
export const postPedido = async (req, res) => {
    try {
        const {
            cli_identificacion,
            cli_nombre,
            cli_telefono,
            cli_correo,
            cli_direccion,
            cli_pais,
            cli_ciudad,
            ped_fecha,
            usr_id,
            ped_estado,
            detalle
        } = req.body;

        // 1. Insertar cliente
        const [cliente] = await conmysql.query(
            `INSERT INTO clientes 
            (cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad)
            VALUES (?,?,?,?,?,?,?)`,
            [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad]
        );

        const cli_id = cliente.insertId;

        // 2. Insertar pedido
        const [pedido] = await conmysql.query( `INSERT INTO pedidos (ped_fecha, usr_id, ped_estado, cli_id) VALUES (?,?,?,?)`,
            [ped_fecha, usr_id, ped_estado, cli_id]
        );

        const ped_id = pedido.insertId;

        // 3. Insertar detalle del pedido
        for (const item of detalle) {
            await conmysql.query(
                `INSERT INTO pedidos_detalle (ped_id, prod_id, det_cantidad, det_precio)
                 VALUES (?,?,?,?)`, [
                    ped_id,
                    item.prod_id,
                    item.det_cantidad,
                    item.det_precio
                ]);
            }

        res.json({
            mensaje: 'Pedido creado correctamente',
            cli_id,
            ped_id
        });
    } catch (error) {
        console.log("🔥 ERROR COMPLETO:", error);
        res.status(500).json({
            mensaje: error.message,
            detalle: error
        });
    }
};