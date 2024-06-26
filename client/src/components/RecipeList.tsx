import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaStar, FaThumbsUp, FaHeart } from 'react-icons/fa';
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

  const saveRecipe = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to save recipes.');
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/recipes/${id}/save`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Recipe saved successfully!');
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to save recipe.');
      }
    }
  };

  const renderStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    }
    return stars;
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-xl text-black mb-4 text-center">
        Welcome to Pie Chef!
      </h2>
      <div className="flex flex-wrap justify-center gap-20">
        {recipes.map((recipe: any) => (
          <div
            key={recipe._id}
            className="card bg-base-100 shadow-xl w-80 cursor-pointer"
            onClick={() => navigate(`/recipe/${recipe._id}`)}
          >
            <figure>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-center">{recipe.title}</h2>
              <p>Cooking Time: {recipe.time} mins</p>
              <p className="flex items-center">
                Difficulty: {renderStars(recipe.difficultyLevel)}
              </p>
              <p>Ingredients: {recipe.ingredients.join(', ')}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="flex items-center">
                  <FaThumbsUp className="mr-1" /> {recipe.numOfLikes}
                </p>
                <div
                  className="card-actions"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => saveRecipe(recipe._id)}
                    className="btn bg-gray-200 btn-sm"
                  >
                    <FaHeart />
                  </button>
                  <button
                    onClick={() => navigate(`/update-recipe/${recipe._id}`)}
                    className="btn bg-gray-200 btn-sm"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteRecipe(recipe._id)}
                    className="btn bg-gray-200 btn-sm"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
