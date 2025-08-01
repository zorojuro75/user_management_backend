import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { corsMiddleware, requestLogger } from './middleware';

dotenv.config();

const app = express();
app.use(express.json());
app.use(corsMiddleware);
app.use(requestLogger);

app.use('/api', routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
});
