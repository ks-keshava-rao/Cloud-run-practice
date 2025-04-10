import express from 'express';
import usersRouter from './routes';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
export default app;
