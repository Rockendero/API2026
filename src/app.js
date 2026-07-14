import express, { response } from 'express'
//npm install cors
import cors from 'cors';
import clientesRoutes from './routes/clientes.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import productosRoutes from './routes/productos.routes.js'
import pedidosRoutes from './routes/pedidos.routes.js';

const app=express();
const corsOptions={
    origin:'*',
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials:true
}

app.use(cors(corsOptions)); //habilitar los cors
app.use(express.json());//para que interprete los objetos json
//app.use('/uploads', express.static('src/img'));
app.use('/uploads/productos', express.static('src/img/productos'));

//rutas
app.use('/api',clientesRoutes)
app.use('/api', usuariosRoutes)
app.use('/api', productosRoutes)
app.use('/api', pedidosRoutes);

//app.use('/api',ProductosRoutes) ejemplo de rutas proximas
app.use((req,res,next)=>{
    res.status(400).json({
        message:'Endpoint not found'
    })
})



export default app;