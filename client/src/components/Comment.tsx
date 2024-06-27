// Comment.tsx
import React from 'react';
import { FaTrash } from 'react-icons/fa';

interface CommentProps {
  comment: any;
  recipeId: string;
  deleteComment: (recipeId: string, commentId: string) => void;
  getUsername: (email: string) => string;
  currentUser: string;
  setModalItemType: (itemType: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setCurrentCommentId: (commentId: string) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  recipeId,
  deleteComment,
  getUsername,
  currentUser,
  setModalItemType,
  setIsModalOpen,
  setCurrentCommentId,
}) => {
  return (
    <div className="border-t border-gray-200 pt-2 mt-2">
      <div className="flex justify-between items-center">
        <p className="font-semibold">{getUsername(comment.username)}</p>
        <div>
          {comment.username && comment.username === currentUser && (
            <button
              onClick={() => {
                setModalItemType('comment');
                setCurrentCommentId(comment._id);
                setIsModalOpen(true);
              }}
              className="btn bg-red-500 text-white btn-sm"
            >
              <FaTrash />
            </button>
          )}
        </div>
      </div>
      <p>{comment.text}</p>
    </div>
  );
};

export default Comment;
