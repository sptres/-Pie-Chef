import { Router } from "express";
import Recipe from '../models/recipe';

const router = Router();

router.post('/recipes', async (req, res) => {
    const {title, image, time, ingredients, difficultyLevel } = req.body;
    try {
        const newRecipe = new Recipe({
            title,
            image,
            time,
            ingredients,
            difficultyLevel,
        });
        await 
    }
})