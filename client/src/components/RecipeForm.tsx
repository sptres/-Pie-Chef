import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RecipeFormProps {
  initialData?: {
    title: string;
    image: string;
    time: number;
    ingredients: string[];
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
    ingredients: [] as string[],
    difficultyLevel: 1,
  });
  const [ingredient, setIngredient] = useState('');

  useEffect(() => {
    if (initialData) {
      setRecipe(initialData);
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

  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        ingredients: [...prevRecipe.ingredients, ingredient.trim()],
      }));
      setIngredient('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: prevRecipe.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(recipe);
  };

  return (
    <div className="flex justify-center">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="form-control bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl mb-4 text-black">
          {isEdit ? 'Update Recipe' : 'Add Recipe'}
        </h2>
        <div className="mb-4">
          <label className="label text-black">Title</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
            placeholder="Recipe Title"
          />
        </div>
        <div className="mb-4">
          <label className="label text-black">Image URL</label>
          <input
            type="text"
            name="image"
            value={recipe.image}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
            placeholder="Image URL"
          />
        </div>
        <div className="mb-4">
          <label className="label text-black">Cooking Time (mins)</label>
          <input
            type="number"
            name="time"
            value={recipe.time}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
            placeholder="Cooking Time"
          />
        </div>
        <div className="mb-4">
          <label className="label text-black">Add Ingredient</label>
          <div className="flex">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Ingredient"
            />
            <button
              type="button"
              onClick={handleAddIngredient}
              className="btn btn-primary ml-2"
            >
              Add
            </button>
          </div>
          <div className="mt-2">
            {recipe.ingredients.map((ing, index) => (
              <div
                key={index}
                className="flex items-center justify-between mt-2"
              >
                <span className="text-black">{ing}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="btn btn-secondary btn-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="label text-black">Difficulty Level (1-5)</label>
          <select
            name="difficultyLevel"
            value={recipe.difficultyLevel}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          {isEdit ? 'Update Recipe' : 'Add Recipe'}
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
