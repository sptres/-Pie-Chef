import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RecipeFormProps {
  initialData?: {
    title: string;
    image: string;
    time: number;
    ingredients: string;
    difficultyLevel: number;
  };
  onSubmit: (data: {
    title: string;
    image: string;
    time: number;
    ingredients: string[];
    difficultyLevel: number;
  }) => void;
  isEdit?: boolean;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  initialData,
  onSubmit,
  isEdit,
}) => {
  const [recipe, setRecipe] = useState({
    title: '',
    image: '',
    time: 0,
    ingredients: '',
    difficultyLevel: 1,
  });

  useEffect(() => {
    if (initialData) {
      setRecipe({
        ...initialData,
        ingredients: initialData.ingredients, // Handle ingredients directly as a string
      });
    }
  }, [initialData]);

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
    onSubmit({ ...recipe, ingredients: ingredientsArray });
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
            placeholder={isEdit ? initialData?.title : 'Recipe Title'}
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
            placeholder={isEdit ? initialData?.image : 'Image URL'}
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
            placeholder={isEdit ? `${initialData?.time}` : 'Cooking Time'}
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
            placeholder={isEdit ? initialData?.ingredients : 'Ingredients'}
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
          {isEdit ? 'Update Recipe' : 'Add Recipe'}
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
