import mongoose, { Schema, Document, Types } from 'mongoose';

interface IComment {
  text: string;
  username: string;
}

interface IRecipe extends Document {
  title: string;
  image: string;
  time: number;
  ingredients: string[];
  difficultyLevel: number;
  numOfLikes: number;
  numOfComments: number;
  savedBy: mongoose.Types.ObjectId[];
  comments: IComment[];
}

const CommentSchema: Schema = new Schema({
  text: { type: String, required: true },
  username: { type: String, required: true },
});

const RecipeSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  time: { type: Number, required: true },
  ingredients: { type: [String], required: true },
  difficultyLevel: { type: Number, required: true },
  numOfLikes: { type: Number, default: 0 },
  numOfComments: { type: Number, default: 0 },
  savedBy: [{ type: Types.ObjectId, ref: 'User' }],
  comments: { type: [CommentSchema], default: [] },
});

const Recipe = mongoose.model<IRecipe>('Recipe', RecipeSchema);

export default Recipe;
