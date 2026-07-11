import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import mainRoutes from './routes/index.js';

// Inicializar la carga de variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware para entender contenido en formato JSON
app.use(express.json());

// Cargar todas las rutas estructuradas
app.use('/', mainRoutes);

// Primero aseguramos la conexión a Atlas, luego encendemos el servidor web
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`=> Server HTTP running successfully at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('The application could not be initialized due to a connection failure:', err.message);
});
