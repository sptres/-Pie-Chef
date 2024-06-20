import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-200 dark:bg-gray-800 p-4">
      <ul className="flex justify-around">
        <li>
          <Link to="/" className="text-black dark:text-white">
            Home
          </Link>
        </li>
        <li>
          <Link to="/add-recipe" className="text-black dark:text-white">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
