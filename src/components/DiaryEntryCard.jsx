/* eslint-disable react/prop-types */

// Define Button component once at the top level of the file
const Button = ({ onClick, icon }) => (
  <button onClick={onClick} className="btn btn-outline flex items-center">
    {icon && <span className="mr-2">{icon}</span>}
  </button>
);

const DiaryEntryCard = ({ entry, onClick, onDelete }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md cursor-pointer bg-black text-white">
      <div className="w-full flex justify-center">
        <img
          src={entry.imageUrl}
          alt={entry.title || "Diary Entry"}
          className="w-full h-60 object-cover rounded-md"
        />
      </div>
      <h2 className="text-lg font-bold mt-2">{entry.title || "Untitled"}</h2>
      <p className="text-gray-400">{entry.date || "No Date"}</p>
      <p className="text-gray-400">{entry.desc || "No Description"}</p>
      <div className="flex justify-between mt-2">
        {/* Use Button component here */}
        <Button
          onClick={() => onClick(entry.id)}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.21 0-4 1.791-4 4s1.79 4 4 4c2.209 0 4-1.791 4-4s-1.791-4-4-4zm-.004 3.999c-.564.564-1.479.564-2.044 0s-.565-1.48 0-2.044c.564-.564 1.479-.564 2.044 0s.565 1.479 0 2.044z"
                fill="red"
              />
            </svg>
          }
        />
        <Button
          onClick={() => onDelete(entry.id)}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M3 6h18M9 6V4a2 2 0 1 1 4 0v2M4 6h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"
                fill="none"
                stroke="red"
                stroke-width="2"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default DiaryEntryCard;
