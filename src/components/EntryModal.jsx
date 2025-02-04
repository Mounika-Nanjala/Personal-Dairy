import Button from "./Button";

/* eslint-disable react/prop-types */
const EntryModal = ({ entry, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold">{entry.title}</h2>
        <p>{entry.date}</p>
        <img
          src={entry.imageUrl}
          alt={entry.title}
          className="w-full h-48 object-cover rounded-lg my-2"
        />
        <p>{entry.desc}</p>
        <Button text="Close" onClick={onClose} />
      </div>
    </div>
  );
};

export default EntryModal; // ✅ Make sure this is present
