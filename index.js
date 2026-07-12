import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = 8080;

// Habilitar CORS para permitir que el frontend (HTML/JS local) consulte este backend
app.use(cors());
app.use(express.json());



// Variable global para reutilizar la conexión del cliente
let dbClient;

async function connectDB() {
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        console.log("¡Conexión exitosa a MongoDB Atlas!");
        dbClient = client;
    } catch (error) {
        console.error("Fallo al conectar a MongoDB, se usarán datos locales por defecto:", error.message);
    }
}

// Inicializar la conexión a la base de datos
connectDB();

// endpoint REST tipo GET requerido por las especificaciones de la tarea
app.get('/professional', async (req, res) => {
    // Si la conexión a MongoDB Atlas está activa, extraemos los datos de la nube (RETO ADICIONAL)
    if (dbClient) {
        try {
            const database = dbClient.db('cse341_data'); // Reemplaza por tu nombre de BD
            const collection = database.collection('frontend_content'); // Reemplaza por tu colección
            const data = await collection.findOne({}); // Obtenemos el primer registro de datos
            
            if (data) {
                return res.json(data);
            }
        } catch (err) {
            console.error("Error consultando la base de datos, usando respaldo local:", err);
        }
    }

    // DATOS DE RESPALDO (Por si no tienes datos en la nube o falla el clúster)
    // Nota: Modifica estos valores con las IDs y variables que use el frontend descargado
    const localFallbackData = {
        professionalName: "Tu Nombre Completo",
        base64Image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", // Imagen Base64 dummy de un píxel
        nameLink: {
            text: "Visita mi perfil de GitHub",
            url: "https://github.com"
        },
        primaryDescription: "Estudiante de Ingeniería de Software en BYU-Idaho enfocado en desarrollo backend.",
        workDescription1: "Desarrollo de APIs escalables utilizando arquitecturas RESTful con Node.js y Express.",
        workDescription2: "Gestión y modelado de datos en entornos NoSQL usando clústeres en la nube de MongoDB Atlas.",
        linkTitleText: "Enlaces de interés académico",
        links: [
            { text: "BYU-Idaho Home", url: "https://byui.edu" },
            { text: "Curso CSE341", url: "https://github.io" }
        ]
    };

    res.json(localFallbackData);
});

// Levantar el servidor en el puerto requerido 8080
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
