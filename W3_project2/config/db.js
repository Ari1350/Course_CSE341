import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let _db;

export const initDB = (callback) => {
  if (_db) {
    console.log('Database is already initialized.');
    return callback(null, _db);
  }
  
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      // .db() asegura que guardamos la instancia de la base de datos y no el cliente completo
      _db = client.db(); 
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

export const getDB = () => {
  if (!_db) {
    throw new Error('Database not initialized. Call initDB first.');
  }
  return _db;
};
