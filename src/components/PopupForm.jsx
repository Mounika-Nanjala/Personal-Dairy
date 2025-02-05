import { useState } from "react";
import Button from "./Button";

const PopupForm = ({ onStart, onClose }) => {
  const [name, setName] = useState(localStorage.getItem("userName") || "");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "theme-light");

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({ name, theme });
  };

  return (
    <div className="fixed inset-0 bg-blue-800 bg-opacity-50 dark:bg-blue-900 dark:bg-opacity-75 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            Personalize Your Experience
          </h2>
          <button
            onClick={onClose}
            className="text-3xl self-start text-gray-800 dark:text-gray-100"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Your Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onClick={(e) => e.target.select()}
              className="input-style dark:bg-gray-700 dark:text-gray-100"
              placeholder={name ? name : "Enter your name"}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Choose Theme:
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="input-style dark:bg-gray-700 dark:text-gray-100"
            >
              <option value="theme-light">Light</option>
              <option value="theme-dark">Dark</option>
              <option value="theme-colorful">Colorful</option>
            </select>
          </div>
          <Button
            className="w-full py-0 bg-indigo-600 dark:bg-indigo-700 text-white hover:bg-indigo-700 hover:text-white font-medium"
            text="Start"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
