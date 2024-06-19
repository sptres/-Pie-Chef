import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/pichef', {
    useNewUrlParser: true,
    useUnifiedToplogy: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

app.get('/', (req, res) => {
  res.send('Hello, Pie Chef!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
