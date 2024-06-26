import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaThumbsUp, FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Comment from './Comment';
import CustomModal from './CustomModal';

const RecipeDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [comment, setComment] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItemType, setModalItemType] = useState<string>('recipe');
  const [currentCommentId, setCurrentCommentId] = useState<string>('');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/recipes/${id}`)
      .then((response) => setRecipe(response.data))
      .catch((error) => console.error(error));

    // Fetch current user
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1]));
      setCurrentUser(user.username); // Use username instead of id
    }
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

  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();
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
        comments: [...prevRecipe.comments, response.data],
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

  const deleteComment = async (recipeId: string, commentId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to delete comments.');
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/recipes/${recipeId}/comments/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRecipe((prevRecipe: any) => ({
        ...prevRecipe,
        comments: prevRecipe.comments.filter(
          (comment: any) => comment._id !== commentId
        ),
        numOfComments: prevRecipe.numOfComments - 1,
      }));
      toast.success('Comment deleted successfully!');
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to delete comment.');
      }
    }
  };

  const getUsername = (email: string) => {
    const [username] = email.split('@');
    return username;
  };

  const handleDelete = () => {
    if (modalItemType === 'recipe') {
      deleteRecipe(recipe._id);
    } else {
      deleteComment(recipe._id, currentCommentId);
    }
    setIsModalOpen(false);
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
                onClick={() => {
                  setModalItemType('recipe');
                  setIsModalOpen(true);
                }}
                className="btn bg-gray-200 btn-sm"
              >
                <FaTrash />
              </button>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold">Comments</h3>
            {recipe.comments.map((comment: any, index: number) => (
              <Comment
                key={index}
                comment={comment}
                recipeId={recipe._id}
                deleteComment={deleteComment}
                getUsername={getUsername}
                currentUser={currentUser}
                setModalItemType={setModalItemType}
                setIsModalOpen={setIsModalOpen}
                setCurrentCommentId={setCurrentCommentId}
              />
            ))}
            <form onSubmit={addComment} className="mt-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="textarea textarea-bordered w-full"
                placeholder="Add a comment"
              ></textarea>
              <button type="submit" className="btn bg-blue-500 text-white mt-2">
                Add Comment
              </button>
            </form>
          </div>
        </div>
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default RecipeDetail;
