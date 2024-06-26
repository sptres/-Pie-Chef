import mongoose, { Schema, Document } from 'mongoose';

interface IRecipe extends Document {
  title: string;
  image: string;
  time: number;
  ingredients: string[];
  difficultyLevel: number;
  numOfLikes: number;
  numOfComments: number;
  savedBy: mongoose.Types.ObjectId[];
}

const RecipeSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  time: { type: Number, required: true },
  ingredients: { type: [String], required: true },
  difficultyLevel: { type: Number, required: true },
  numOfLikes: { type: Number, default: 0 },
  numOfComments: { type: Number, default: 0 },
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Recipe = mongoose.model<IRecipe>('Recipe', RecipeSchema);

export default Recipe;
