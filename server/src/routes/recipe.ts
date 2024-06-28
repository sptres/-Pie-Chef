import { Router, Request, Response } from 'express';
import Recipe from '../models/recipe';
import { authenticateToken } from './auth';
import { Types } from 'mongoose';

const router = Router();

router.post('/recipes', async (req: Request, res: Response) => {
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

router.get('/recipes', async (req: Request, res: Response) => {
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

// Route to get saved recipes for a user
router.get(
  '/recipes/saved',
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const recipes = await Recipe.find({ savedBy: userId });
      res.status(200).json(recipes);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error' });
      }
    }
  }
);

router.get('/recipes/:id', async (req: Request, res: Response) => {
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

router.put('/recipes/:id', async (req: Request, res: Response) => {
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

router.delete('/recipes/:id', async (req: Request, res: Response) => {
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

router.post(
  '/recipes/:id/save',
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }

      const userId = (req as any).user.id; // Ensure user id is present

      if (!recipe.savedBy.includes(userId)) {
        recipe.savedBy.push(new Types.ObjectId(userId));
        await recipe.save();
        res.status(200).json({ message: 'Recipe saved successfully' });
      } else {
        res.status(400).json({ message: 'Recipe already saved' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error' });
      }
    }
  }
);

router.post(
  '/recipes/:id/unsave',
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }

      const userId = (req as any).user.id; // Ensure user id is present

      const index = recipe.savedBy.indexOf(new Types.ObjectId(userId));
      if (index > -1) {
        recipe.savedBy.splice(index, 1);
        await recipe.save();
        res.status(200).json({ message: 'Recipe unsaved successfully' });
      } else {
        res.status(400).json({ message: 'Recipe not saved' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error' });
      }
    }
  }
);

router.post(
  '/recipes/:id/comments',
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { text } = req.body;
    const username = (req as any).user.username; // assuming the user object has a username field

    try {
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }

      const newComment = {
        text,
        username,
        createdAt: new Date(),
      };

      recipe.comments.push(newComment);
      recipe.numOfComments += 1;
      await recipe.save();

      res.status(201).json(newComment);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error' });
      }
    }
  }
);

router.delete(
  '/recipes/:recipeId/comments/:commentId',
  authenticateToken,
  async (req: Request, res: Response) => {
    const { recipeId, commentId } = req.params;

    try {
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }

      const commentIndex = recipe.comments.findIndex(
        (comment: any) => comment._id.toString() === commentId
      );

      if (commentIndex === -1) {
        console.log('Comment not found or not owned by user');
        return res
          .status(403)
          .json({ message: 'You can only delete your own comments' });
      }

      recipe.comments.splice(commentIndex, 1);
      recipe.numOfComments -= 1;
      await recipe.save();
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error' });
      }
    }
  }
);

router.post(
  '/recipes/:id/like',
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }

      recipe.numOfLikes += 1;
      await recipe.save();

      res.status(200).json({
        message: 'Recipe liked successfully',
        numOfLikes: recipe.numOfLikes,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error' });
      }
    }
  }
);

export default router;
