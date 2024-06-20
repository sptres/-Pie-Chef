// src/components/RecipeList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/recipes')
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl text-black dark:text-white">
        Welcome to Pie Chef!
      </h2>
      <div>
        {recipes.map((recipe: any) => (
          <div
            key={recipe._id}
            className="bg-gray-100 dark:bg-gray-800 p-4 my-4 rounded"
          >
            <h3 className="text-lg text-black dark:text-white">
              {recipe.title}
            </h3>
            <p className="text-sm text-black dark:text-white">
              Cooking Time: {recipe.time} mins
            </p>
            <p className="text-sm text-black dark:text-white">
              Difficulty: {recipe.difficultyLevel} stars
            </p>
            <p className="text-sm text-black dark:text-white">
              Ingredients: {recipe.ingredients.join(', ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
