import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/index.js';
import routes from './routes/index.js';

const app = express();

const corsOptions = {
  origin: '*', // El frontend en local
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type'],
};


app.use(cors(corsOptions));

app.use(express.json());
app.use('/api', routes);


app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
