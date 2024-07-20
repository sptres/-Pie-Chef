import React from 'react';
import { GiChefToque } from 'react-icons/gi';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 w-full rounded-lg shadow">
      <div className="w-full max-w-screen-xl mx-auto p-2 md:py-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-2 sm:mb-0 space-x-2 rtl:space-x-reverse"
          >
            <GiChefToque />
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Pie Chef
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-4 text-sm font-medium text-gray-500 sm:mb-0">
            <li>
              <a
                href="https://github.com/sptres"
                className="hover:underline me-4 md:me-6"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="https://github.com/sptres"
                className="hover:underline me-4 md:me-6"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://github.com/sptres"
                className="hover:underline me-4 md:me-6"
              >
                Licensing
              </a>
            </li>
            <li>
              <a href="https://github.com/sptres" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-4 border-gray-200 sm:mx-auto lg:my-6" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © 2024
          <a href="/" className="hover:underline">
            Pie Chef™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
