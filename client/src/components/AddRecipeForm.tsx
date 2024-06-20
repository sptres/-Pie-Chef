import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RecipeForm from './RecipeForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddRecipeForm: React.FC = () => {
  const navigate = useNavigate();

  const handleAddRecipe = (data: {
    title: string;
    image: string;
    time: number;
    ingredients: string[];
    difficultyLevel: number;
  }) => {
    axios
      .post('http://localhost:5000/api/recipes', data)
      .then((response) => {
        toast.success('Recipe added successfully!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data.message === 'Recipe title already exists'
        ) {
          toast.error('Recipe title already exists');
        } else {
          toast.error('Failed to add recipe');
        }
      });
  };

  return (
    <div>
      <ToastContainer />
      <RecipeForm onSubmit={handleAddRecipe} />
    </div>
  );
};

export default AddRecipeForm;
