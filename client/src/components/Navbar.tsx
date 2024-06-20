import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiChefToque } from 'react-icons/gi';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="navbar bg-gray-200 p-4 shadow-lg">
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center btn btn-ghost normal-case text-xl text-black"
        >
          <GiChefToque className="mr-2" />
          Pie Chef
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/" className="btn btn-ghost text-black">
              Home
            </Link>
          </li>
          <li>
            <Link to="/add-recipe" className="btn btn-ghost text-black">
              Add Recipe
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <button
                onClick={handleLogout}
                className="btn btn-ghost text-black"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="btn btn-ghost text-black">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-ghost text-black">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
