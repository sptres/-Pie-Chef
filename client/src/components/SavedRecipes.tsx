import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaThumbsUp, FaHeartBroken } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SavedRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('You must be logged in to view saved recipes');
          return;
        }
        const response = await axios.get(
          'http://localhost:5000/api/recipes/saved',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRecipes(response.data);
      } catch (error) {
        const err = error as any;
        if (err.response && err.response.data) {
          toast.error(err.response.data.message);
        } else {
          toast.error('Failed to fetch saved recipes');
        }
      }
    };

    fetchSavedRecipes();
  }, []);

  const unsaveRecipe = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to unsave recipes.');
      return;
    }
    try {
      await axios.post(
        `http://localhost:5000/api/recipes/${id}/unsave`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRecipes(recipes.filter((recipe: any) => recipe._id !== id));
      toast.success('Recipe unsaved successfully!');
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to unsave recipe.');
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
      <h2 className="text-xl text-black mb-4 text-center">Saved Recipes</h2>
      <div className="flex flex-wrap justify-center gap-20">
        {recipes.map((recipe: any) => (
          <div key={recipe._id} className="card bg-base-100 shadow-xl w-80">
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
                <div className="card-actions">
                  <button
                    onClick={() => unsaveRecipe(recipe._id)}
                    className="btn bg-gray-200 btn-sm"
                  >
                    <FaHeartBroken />
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

export default SavedRecipes;
