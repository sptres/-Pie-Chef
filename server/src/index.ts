import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import recipeRoutes from './routes/recipe';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect('mongodb://localhost:27017/piechef')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use('/api', recipeRoutes);

app.get('/', (req, res) => {
  res.send('Hello, Pie Chef!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
