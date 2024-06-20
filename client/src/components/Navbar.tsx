import React from 'react';
import { Link } from 'react-router-dom';
import { GiChefToque } from 'react-icons/gi'; // Import the chef hat icon from react-icons

const Navbar: React.FC = () => {
  return (
    <nav className="navbar bg-gray-200 dark:bg-gray-800 p-4 shadow-lg">
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center btn btn-ghost normal-case text-xl text-black dark:text-white"
        >
          <GiChefToque className="mr-2" /> {/* Add the chef hat icon */}
          Pie Chef
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/" className="btn btn-ghost text-black dark:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/add-recipe"
              className="btn btn-ghost text-black dark:text-white"
            >
              Add Recipe
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
