import Button from "./Button";

/* eslint-disable react/prop-types */
const DiaryEntryCard = ({ entry, onClick, onDelete }) => {
  console.log(entry.imageUrl);

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
        <Button text="Edit" onClick={() => onClick(entry.id)} />
        <Button text="Delete" onClick={() => onDelete(entry.id)} />
      </div>
    </div>
  );
};

export default DiaryEntryCard;
