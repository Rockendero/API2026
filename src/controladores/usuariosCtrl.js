import { conmysql } from '../db.js'

export const getUsuarios = async (req, res) => {
    try {
        const [result] = await conmysql.query('select * from usuarios')
        res.json(result)
    } catch (error) {
        console.error("Error real de MySQL:", error); // <-- Agrega esta línea
        return res.status(500).json({ message: 'Error al obtener los clientes' })
    }
}