import { useState, useEffect } from "react"

const DiaryEntries = ({ onViewEntry }) => {
    const [entries, setEntries] = useState([]);

    // Load entries from local storage
    useEffect(() => {
        const storedEntries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
        setEntries(storedEntries);
    });

    // Function to remove entries
    const removeEntry = (index) => {
        if(window.confirm("Are you sure you want to delete this entry?")){
            const updatedEntries = entries.filter((_, i) => i !== index);
            setEntries(updatedEntries);
            localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries));
        }
    };

    return (
        <div className="grid grid-cols-1 gap-6">
            {entries.length > 0 ? (
                entries.map((entry, index) => (
                    <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
                        <p className="text-gray-600">{entry.date}</p>
                        <h3 className="text-xl font-semibold">{entry.title}</h3>
                        <img 
                            src={entry.image}
                            alt={entry.title} 
                            className="object-cover rounded-md"/>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => onViewEntry(entry)}
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                View
                            </button>
                            <button
                                onClick={() => removeEntry(index)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                                Remove
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No diary entry yet</p>
            )};
        </div>
    );
};

export default DiaryEntries;