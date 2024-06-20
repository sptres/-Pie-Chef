// src/components/AddRecipeForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const AddRecipeForm: React.FC = () => {
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    image: '',
    time: 0,
    ingredients: '',
    difficultyLevel: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ingredientsArray = newRecipe.ingredients
      .split(',')
      .map((ingredient) => ingredient.trim());
    axios
      .post('http://localhost:5000/api/recipes', {
        ...newRecipe,
        ingredients: ingredientsArray,
      })
      .then((response) => {
        console.log('Recipe added:', response.data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 dark:bg-gray-800 p-4 rounded"
    >
      <div className="mb-4">
        <label className="block text-black dark:text-white">Title</label>
        <input
          type="text"
          name="title"
          value={newRecipe.title}
          onChange={handleChange}
          className="w-full p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-black dark:text-white">Image URL</label>
        <input
          type="text"
          name="image"
          value={newRecipe.image}
          onChange={handleChange}
          className="w-full p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-black dark:text-white">
          Cooking Time (mins)
        </label>
        <input
          type="number"
          name="time"
          value={newRecipe.time}
          onChange={handleChange}
          className="w-full p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-black dark:text-white">
          Ingredients (comma-separated)
        </label>
        <textarea
          name="ingredients"
          value={newRecipe.ingredients}
          onChange={handleChange}
          className="w-full p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-black dark:text-white">
          Difficulty Level (1-5)
        </label>
        <select
          name="difficultyLevel"
          value={newRecipe.difficultyLevel}
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
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
