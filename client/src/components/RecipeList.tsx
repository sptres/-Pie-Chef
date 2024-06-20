import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/recipes')
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error(error));
  }, []);

  const deleteRecipe = (id: string) => {
    axios
      .delete(`http://localhost:5000/api/recipes/${id}`)
      .then((response) => {
        setRecipes(recipes.filter((recipe: any) => recipe._id !== id));
        toast.success('Recipe deleted successfully!');
      })
      .catch((error) => {
        toast.error('Failed to delete recipe.');
      });
  };

  const updateRecipe = (id: string) => {
    navigate(`/update-recipe/${id}`);
  };

  return (
    <div className="p-4">
      <ToastContainer />
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
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={() => updateRecipe(recipe._id)}
                className="text-blue-500"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteRecipe(recipe._id)}
                className="text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
