import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/recipes')
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <header className="bg-gray-200 dark:bg-gray-800 p-4">
          <h1 className="text-2xl text-center text-black dark:text-white">
            Pie Chef
          </h1>
          <button
            className="mt-2 text-sm text-black dark:text-white"
            onClick={() => setDarkMode(!darkMode)}
          >
            Toggle Theme
          </button>
        </header>
        <main className="p-4">
          <h2 className="text-xl text-black dark:text-white">
            Welcome to Pie Chef!
          </h2>
          <div>
            {recipes.map((recipe: any) => (
              <div
                key={recipe._id}
                className="bg-gray-100 dark:bg-gray-800 p-4 my-4 rounded"
              >
                <h3 className="text-lg text-black dark:text-white">
                  {recipe.title}
                </h3>
                <p className="text-sm text-black dark:text-white">
                  Cooking Time: {recipe.time} mins
                </p>
                <p className="text-sm text-black dark:text-white">
                  Difficulty: {recipe.difficultyLevel} stars
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
