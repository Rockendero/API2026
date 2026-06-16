export const verificarToken = (req, res, next) => {
    const token = req.headers['api-key'];
    if (token !== 'LordLiuKang') {
        return res.status(401).json({
            mensaje: 'Acceso denegado'
        });
    }
    next();
};
