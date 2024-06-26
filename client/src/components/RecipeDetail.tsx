import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaThumbsUp, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const RecipeDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/recipes/${id}`)
      .then((response) => setRecipe(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const renderStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    }
    return stars;
  };

  const deleteRecipe = (id: string) => {
    axios
      .delete(`http://localhost:5000/api/recipes/${id}`)
      .then((response) => {
        toast.success('Recipe deleted successfully!');
        // Redirect or perform any other actions here if necessary
      })
      .catch((error) => {
        toast.error('Failed to delete recipe.');
      });
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-2xl mx-auto">
        <figure>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-center">{recipe.title}</h2>
          <p>Cooking Time: {recipe.time} mins</p>
          <p className="flex items-center">
            Difficulty: {renderStars(recipe.difficultyLevel)}
          </p>
          <p>Ingredients: {recipe.ingredients.join(', ')}</p>
          <p>{recipe.instructions}</p>
          <div className="flex justify-between items-center mt-2">
            <p className="flex items-center">
              <FaThumbsUp className="mr-1" /> {recipe.numOfLikes}
            </p>
            <div className="card-actions">
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
    </div>
  );
};

export default RecipeDetail;
