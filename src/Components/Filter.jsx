import React from 'react';

const Filter = () => {
  const names = ["John", "Jane", "Mike", "Sara", "David"];

  const handleButtonClick = (name) => {
    alert(`Button clicked for ${name}`);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Name List</h1>
      <table className="w-full border border-gray-300 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {names.map((name, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-3 border">{name}</td>
              <td className="p-3 border">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleButtonClick(name)}
                >
                  Click Me
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Filter;
