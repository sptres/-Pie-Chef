import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import UpdateRecipeForm from './components/UpdateRecipeForm';
import RecipeDetail from './components/RecipeDetail';
import Login from './components/Login';
import Register from './components/Register';
import SavedRecipes from './components/SavedRecipes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/add-recipe" element={<AddRecipeForm />} />
            <Route path="/update-recipe/:id" element={<UpdateRecipeForm />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/saved-recipes" element={<SavedRecipes />} />
          </Routes>
        </div>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
