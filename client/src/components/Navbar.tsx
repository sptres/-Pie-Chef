import React from 'react';
import { Link } from 'react-router-dom';
import { GiChefToque } from 'react-icons/gi';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar bg-gray-200 p-4 shadow-lg">
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center btn btn-ghost normal-case text-xl text-black "
        >
          <GiChefToque className="mr-2" />
          Pie Chef
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/" className="btn btn-ghost text-black ">
              Home
            </Link>
          </li>
          <li>
            <Link to="/add-recipe" className="btn btn-ghost text-black">
              Add Recipe
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
