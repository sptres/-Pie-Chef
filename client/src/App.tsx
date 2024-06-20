import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import UpdateRecipeForm from './components/UpdateRecipeForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';

const App: React.FC = () => {
  return (
    <div className="">
      <div className="bg-white min-h-screen">
        <Router>
          <Navbar />
          <div className="p-4 m-4">
            <Routes>
              <Route path="/" element={<RecipeList />} />
              <Route path="/add-recipe" element={<AddRecipeForm />} />
              <Route path="/update-recipe/:id" element={<UpdateRecipeForm />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;
