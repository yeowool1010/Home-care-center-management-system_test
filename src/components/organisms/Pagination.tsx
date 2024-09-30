import React from 'react';

const Pagination: React.FC = () => {
  return (
    <div className="mt-6 flex justify-center space-x-2">
      <button className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-400">◀</button>
      {Array.from({ length: 10 }, (_, i) => (
        <button
          key={i}
          className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          {i + 1}
        </button>
      ))}
      <button className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-400">▶</button>
    </div>
  );
};

export default Pagination;
