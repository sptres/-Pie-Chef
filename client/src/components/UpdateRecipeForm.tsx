import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateRecipeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: '',
    image: '',
    time: 0,
    ingredients: '',
    difficultyLevel: 1,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/recipes/${id}`)
      .then((response) => {
        const data = response.data;
        setRecipe({
          title: data.title,
          image: data.image,
          time: data.time,
          ingredients: data.ingredients.join(', '),
          difficultyLevel: data.difficultyLevel,
        });
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ingredientsArray = recipe.ingredients
      .split(',')
      .map((ingredient) => ingredient.trim());
    axios
      .put(`http://localhost:5000/api/recipes/${id}`, {
        ...recipe,
        ingredients: ingredientsArray,
      })
      .then((response) => {
        toast.success('Recipe updated successfully!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch((error) => {
        toast.error('Failed to update recipe.');
      });
  };

  return (
    <div>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 dark:bg-gray-800 p-4 rounded"
      >
        <div className="mb-4">
          <label className="block text-black dark:text-white">Title</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            className="w-full p-2"
            required
            placeholder={recipe.title}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black dark:text-white">Image URL</label>
          <input
            type="text"
            name="image"
            value={recipe.image}
            onChange={handleChange}
            className="w-full p-2"
            required
            placeholder={recipe.image}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black dark:text-white">
            Cooking Time (mins)
          </label>
          <input
            type="number"
            name="time"
            value={recipe.time}
            onChange={handleChange}
            className="w-full p-2"
            required
            placeholder={`${recipe.time}`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black dark:text-white">
            Ingredients (comma-separated)
          </label>
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            className="w-full p-2"
            required
            placeholder={recipe.ingredients}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black dark:text-white">
            Difficulty Level (1-5)
          </label>
          <select
            name="difficultyLevel"
            value={recipe.difficultyLevel}
            onChange={handleChange}
            className="w-full p-2"
            required
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default UpdateRecipeForm;
