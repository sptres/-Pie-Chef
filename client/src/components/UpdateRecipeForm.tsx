import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import RecipeForm from './RecipeForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateRecipeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/recipes/${id}`)
      .then((response) => {
        const data = response.data;
        setInitialData({
          title: data.title,
          image: data.image,
          time: data.time,
          ingredients: data.ingredients,
          difficultyLevel: data.difficultyLevel,
        });
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleUpdateRecipe = (data: {
    title: string;
    image: string;
    time: number;
    ingredients: string[];
    difficultyLevel: number;
  }) => {
    axios
      .put(`http://localhost:5000/api/recipes/${id}`, data)
      .then((response) => {
        toast.success('Recipe updated successfully!');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data.message === 'Recipe title already exists'
        ) {
          toast.error('Recipe title already exists');
        } else {
          toast.error('Failed to update recipe');
        }
      });
  };

  return (
    <div>
      <ToastContainer />
      {initialData && (
        <RecipeForm
          initialData={initialData}
          onSubmit={handleUpdateRecipe}
          isEdit
        />
      )}
    </div>
  );
};

export default UpdateRecipeForm;
