import { conmysql } from '../db.js'

export const getProductos = async (req, res) => {
    try {
        const [result] = await conmysql.query('select * from productos')
        res.json(result)
    } catch (error) {
        console.error("Error real de MySQL:", error);
        return res.status(500).json({ message: 'Error al obtener los productos' })
    }
}

export const getProductosxid = async (req, res) => {
    try {
        const [result] = await conmysql.query('select * from productos where prod_id = ?', [req.params.id])
        if (result.length <= 0) return res.json({
            cantidad: 0,
            message: 'No se encontro el producto'
        })
        res.json({
            cantidad: result.length,
            data: result[0]
        })
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el producto' })
    }
}

export const postInsertarProductos = async (req, res) => {
    try {
        const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo } = req.body
        const prod_imagen = req.file ? req.file.path : null
        const [result] = await conmysql.query('insert into productos (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen) values (?,?,?,?,?,?)', [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen]
        )
        res.json({ prod_id: result.insertId })
    } catch (error) {
        return res.status(500).json({ message: 'Error al insertar el producto' })
    }
}

export const putProductos = async (req, res) => {
    try {
        const { id } = req.params
        const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo } = req.body
        const prod_imagen = req.file ? req.file.path : req.body.prod_imagen
        await conmysql.query('update productos set prod_codigo = ?, prod_nombre = ?, prod_stock = ?, prod_precio = ?, prod_activo = ?, prod_imagen = ? where prod_id = ?',
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, id]
        )
        res.json({ prod_id: id, message: 'Producto actualizado exitosamente' })
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el producto' })
    }
}

export const deleteProductos = async (req, res) => {
    try {
        const { id } = req.params
        const [result] = await conmysql.query('delete from productos where prod_id = ?', [id])
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' })
        return res.status(200).json({ message: 'Producto eliminado exitosamente' })
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el producto' })
    }
}
