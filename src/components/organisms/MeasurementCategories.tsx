import React from 'react';

const categories = [
  '회차',
  '측정날짜',
  '상체근력',
  '상체유연성',
  '하체근력',
  '하체유연성',
  'TUG',
  '제자리걷기',
];

const MeasurementCategories: React.FC = () => {
  return (
    <div className="flex justify-between bg-blue-100 p-2 rounded-lg shadow-md mb-6">
      {categories.map((category) => (
        <button
          key={category}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default MeasurementCategories;
