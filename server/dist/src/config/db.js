import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
let mongoMemoryServer = null;
export async function connectDB() {
    const uri = process.env.MONGODB_URI;
    if (uri && uri.trim() !== '') {
        try {
            console.log(`Connecting to MongoDB at: ${uri.replace(/\/\/.*@/, '//***:***@')}`);
            await mongoose.connect(uri, {
                serverSelectionTimeoutMS: 5000,
            });
            console.log('MongoDB successfully connected.');
            return;
        }
        catch (err) {
            console.warn(`Could not connect to external MongoDB: ${err.message}. Falling back to embedded MongoMemoryServer for demo.`);
        }
    }
    // Fallback to in-memory Mongo server for zero-config hackathon demo
    try {
        console.log('Starting embedded in-memory MongoDB server for zero-config demo...');
        mongoMemoryServer = await MongoMemoryServer.create();
        const memoryUri = mongoMemoryServer.getUri();
        await mongoose.connect(memoryUri);
        console.log(`Embedded MongoDB started and connected successfully at: ${memoryUri}`);
    }
    catch (memErr) {
        console.error('Failed to initialize embedded MongoDB server:', memErr);
        throw memErr;
    }
}
export async function disconnectDB() {
    await mongoose.disconnect();
    if (mongoMemoryServer) {
        await mongoMemoryServer.stop();
    }
}
