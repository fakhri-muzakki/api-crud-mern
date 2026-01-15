import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Import routes
import userRoutes from './routes/user.route';

// Import middleware
import { notFound, errorHandler } from './middlewares';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ Root endpoint - API info
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Book Store API',
    version: '1.0.0',
    documentation: 'https://github.com/fakhri-muzakki/api-crud-mern',
    endpoints: {
      health: '/health',
      users: '/api/users',
    },
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.use('/api/users', userRoutes);

// Error handling middleware (harus di akhir)
app.use(notFound);
app.use(errorHandler);

export default app;
