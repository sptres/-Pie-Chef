import React from 'react';
import { FaTrash } from 'react-icons/fa';

interface CommentProps {
  comment: any;
  recipeId: string;
  deleteComment: (recipeId: string, commentId: string) => void;
  getUsername: (email: string) => string;
  currentUser: string; // Accept currentUser as a prop
}

const Comment: React.FC<CommentProps> = ({
  comment,
  recipeId,
  deleteComment,
  getUsername,
  currentUser,
}) => {
  return (
    <div className="border-t border-gray-200 pt-2 mt-2">
      <div className="flex justify-between items-center">
        <p className="font-semibold">{getUsername(comment.username)}</p>
        <button
          onClick={() => deleteComment(recipeId, comment._id)}
          className="btn bg-red-500 text-white btn-sm"
        >
          <FaTrash />
        </button>
      </div>
      <p>{comment.text}</p>
    </div>
  );
};

export default Comment;
