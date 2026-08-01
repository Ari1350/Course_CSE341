import express from 'express';
import dotenv from 'dotenv';
import { initDB } from './config/db.js';
import mainRouter from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares para procesar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Encabezados CORS básicos para permitir llamadas externas 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Enrutador Principal
app.use('/', mainRouter);

// Manejo de errores global (Captura cualquier error inesperado en la app)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An internal error occurred on the server.',
    error: err.message
  });
});

// Inicializar Base de Datos y Servidor
initDB((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    app.listen(PORT, () => {
      console.log(`=> Server successfully listening on port ${PORT}`);
    });
  }
});
