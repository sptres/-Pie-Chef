import { Router } from 'express';
import Recipe from '../models/recipe';

const router = Router();

router.post('/recipes', async (req, res) => {
  const { title, image, time, ingredients, difficultyLevel } = req.body;
  try {
    const existingRecipe = await Recipe.findOne({ title });
    if (existingRecipe) {
      return res.status(400).json({ message: 'Recipe title already exists' });
    }
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

router.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Unknown error' });
    }
  }
});

router.put('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, image, time, ingredients, difficultyLevel } = req.body;
  try {
    const existingRecipe = await Recipe.findOne({ title, _id: { $ne: id } });
    if (existingRecipe) {
      return res.status(400).json({ message: 'Recipe title already exists' });
    }
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { title, image, time, ingredients, difficultyLevel },
      { new: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(updatedRecipe);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Unknown error' });
    }
  }
});

router.delete('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json({ message: 'Recipe deleted' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Unknown error' });
    }
  }
});

export default router;
