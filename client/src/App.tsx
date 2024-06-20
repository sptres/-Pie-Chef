import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <Router>
          <Navbar />
          <div className="p-4">
            <button
              className="mb-4 text-sm text-black dark:text-white"
              onClick={() => setDarkMode(!darkMode)}
            >
              Toggle Theme
            </button>
            <Routes>
              <Route path="/" element={<RecipeList />} />
              <Route path="/add-recipe" element={<AddRecipeForm />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;
