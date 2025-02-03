const DiaryEntryCard = () => {
  return (
    <div className="border p-4 rounded-lg shadow-md cursor-pointer bg-slate-100">
      <div className="w-full flex justify-center">
        <img
          // src={entry.image}
          // alt={entry.title}
          className="w-auto h-60 object-contain rounded-md"
        />
      </div>
      <h2 className="text-lg font-bold mt-2">{/* {entry.title} */}</h2>
      <p className="text-gray-500">{/* {entry.date} */}</p>
      <div className="flex justify-between mt-2">
        <button
          // onClick={() => onClick(entry)}
          className="text-blue-500"
        >
          View
        </button>
        <button
          // onClick={() => onDelete(entry.id)}
          className="text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DiaryEntryCard;
