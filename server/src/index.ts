import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

import { connectDB } from './config/db.js';
import apiRouter from './routes/index.js';
import { setSocketIO } from './services/notifications/index.js';
import { seedDatabaseIfEmpty } from '../scripts/seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';

const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  }
});

setSocketIO(io);

// Socket.IO connection handling
io.on('connection', (socket) => {
  // Join role or user room
  socket.on('join_user', (userId: string) => {
    socket.join(`user_${userId}`);
  });

  socket.on('join_project', (projectId: string) => {
    socket.join(`project_${projectId}`);
  });

  socket.on('project_message', (data: { projectId: string; message: any }) => {
    io.to(`project_${data.projectId}`).emit('new_project_message', data.message);
  });

  socket.on('disconnect', () => {
    // client disconnected
  });
});

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static uploads serving
const uploadsPath = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsPath));

// Healthcheck
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    name: 'Nirmaan API Service',
    ministry: 'Government of Jharkhand',
    problemStatement: 'SIH26043',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api', apiRouter);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server Internal Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An unexpected error occurred on the server.'
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    await seedDatabaseIfEmpty();

    server.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`🚀 Nirmaan API running on http://localhost:${PORT}`);
      console.log(`🇮🇳 SIH26043 — Government of Jharkhand`);
      console.log(`💡 Mode: ${process.env.DEMO_MODE === 'true' ? 'DEMO_MODE (Zero-Config)' : 'PRODUCTION'}`);
      console.log(`=======================================================`);
    });
  } catch (error) {
    console.error('Failed to start GramUtthan server:', error);
    process.exit(1);
  }
}

startServer();
