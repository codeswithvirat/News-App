import React, { useState } from "react";

const Navbar = ({ setCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOffCanvas = () => setIsOpen(!isOpen);
  const closeOffCanvas = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg text-white">
      {/* Navbar Content */}
      <div className="flex justify-between items-center p-4 px-6">
        {/* Brand */}
        <div className="text-xl font-bold tracking-wide flex items-center gap-2">
          <svg
            height="30px"
            width="30px"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-white"
          >
            <path d="M57.247 24.222c.973-2.628..." />
          </svg>
          <span className="text-white">NewsHunt</span>
        </div>

        {/* Categories for Larger Screens */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {["General", "Sports", "Technology", "Health", "Entertainment"].map(
            (category) => (
              <button
                key={category}
                onClick={() => setCategory(category.toLowerCase())}
                className="hover:text-blue-300 transition-colors"
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Hamburger Menu for Small Screens */}
        <button
          className="block md:hidden"
          onClick={toggleOffCanvas}
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 12a.5.5 0 0 1..." />
          </svg>
        </button>
      </div>

      {/* Off-Canvas Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeOffCanvas}
        role="presentation"
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-gray-800 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul className="space-y-4">
            {["General", "Sports", "Technology", "Health", "Entertainment"].map(
              (category) => (
                <li key={category}>
                  <button
                    onClick={() => {
                      setCategory(category.toLowerCase());
                      closeOffCanvas();
                    }}
                    className="w-full text-left py-2 px-4 rounded-lg hover:bg-blue-100 transition"
                  >
                    {category}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
