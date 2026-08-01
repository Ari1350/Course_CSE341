import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let _db;

export const initDB = (callback) => {
  if (_db) {
    console.log('The database is already initialized.');
    return callback(null, _db);
  }
  
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

export const getDB = () => {
  if (!_db) {
    throw new Error('Database not initialized.');
  }
  return _db;
};
