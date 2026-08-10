import express from 'express'; 
import dotenv from 'dotenv'; 
import session from 'express-session'; 
import passport from 'passport'; 
import { Strategy as GitHubStrategy } from 'passport-github2'; 
import { initDB } from './config/db.js'; 
import mainRouter from './routes/index.js'; 

dotenv.config(); 

const app = express(); // la app de Express
const PORT = process.env.PORT || 8080; 

// 2. Middlewares obligatorios para procesar JSON y formularios
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// 3. Configuración del manejo de sesiones en Express
app.use(session({ 
  secret: process.env.SESSION_SECRET || 'secretWord123', 
  resave: false, 
  saveUninitialized: false 
})); 

// 4. Inicializar y conectar Passport con Express
app.use(passport.initialize()); 
app.use(passport.session()); 

// 5. Configurar la estrategia de inicio de sesión con GitHub OAuth
passport.use(new GitHubStrategy({ 
    clientID: process.env.GITHUB_CLIENT_ID, 
    clientSecret: process.env.GITHUB_CLIENT_SECRET, 
    callbackURL: process.env.CALLBACK_URL 
  }, 
  (accessToken, refreshToken, profile, done) => { 
    return done(null, profile); 
  } 
)); 

// 6. Funciones obligatorias de Passport para guardar los datos del usuario en la sesión
passport.serializeUser((user, done) => { done(null, user); }); 
passport.deserializeUser((obj, done) => { done(null, obj); }); 

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

// Manejo de errores global
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
