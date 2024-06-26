import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaThumbsUp, FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const RecipeDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [comment, setComment] = useState<string>('');

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
        navigate('/');
      })
      .catch((error) => {
        toast.error('Failed to delete recipe.');
      });
  };

  const addComment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to add comments.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/recipes/${id}/comments`,
        { text: comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRecipe((prevRecipe: any) => ({
        ...prevRecipe,
        comments: [...prevRecipe.comments, { text: comment, username: 'You' }],
        numOfComments: prevRecipe.numOfComments + 1,
      }));
      setComment('');
      toast.success('Comment added successfully!');
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to add comment.');
      }
    }
  };

  const getUsername = (email: string) => {
    const [username] = email.split('@');
    return username;
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <ToastContainer />
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
          <div className="mt-4">
            <h3 className="text-lg font-bold">Comments</h3>
            {recipe.comments.map((comment: any, index: number) => (
              <div key={index} className="border-t border-gray-200 pt-2 mt-2">
                <p className="font-semibold">{getUsername(comment.username)}</p>
                <p>{comment.text}</p>
              </div>
            ))}
            <div className="mt-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="textarea textarea-bordered w-full"
                placeholder="Add a comment"
              ></textarea>
              <button
                onClick={addComment}
                className="btn bg-blue-500 text-white mt-2"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
