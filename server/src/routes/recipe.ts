import { Router } from 'express';
import Recipe from '../models/recipe';

const router = Router();

router.post('/recipes', async (req, res) => {
  const { title, image, time, ingredients, difficultyLevel } = req.body;
  try {
    const newRecipe = new Recipe({
      title,
      image,
      time,
      ingredients,
      difficultyLevel,
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Unknown error' });
    }
  }
});

router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Unknown error' });
    }
  }
});

export default router;
