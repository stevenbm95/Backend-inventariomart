import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/index.js';
import routes from './routes/index.js';

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://frontend-inventariomart.vercel.app' // reemplázalo por tu dominio real de Vercel
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};


app.use(cors(corsOptions));

app.use(express.json());
app.use('/api', routes);


app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

export default (req, res) => {
  app(req, res); // Esta es la forma correcta de invocar Express en Vercel.
};
