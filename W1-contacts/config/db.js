import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
let dbInstance = null;

export const connectDB = async () => {
    if (dbInstance) return dbInstance;
    
    try {
        const client = new MongoClient(uri);
        await client.connect();

        dbInstance = client.db('contacts_project');
        console.log('=> Successfully connected to MongoDB Atlas!');
        return dbInstance;
    } catch (error) {
        console.error('Critical error while connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

export const getDB = () => {
    if (!dbInstance) {
        throw new Error('The database has not been initialized yet.');
    }
    return dbInstance;
};
