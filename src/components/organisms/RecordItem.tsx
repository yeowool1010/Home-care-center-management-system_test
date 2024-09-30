import React from 'react';

interface RecordProps {
  round: string;
  date: string;
  upperStrength: string;
  upperFlexibility: string;
  lowerStrength: string;
  lowerFlexibility: string;
  tug: string;
  stationaryWalk: string;
}

const RecordItem: React.FC<RecordProps> = ({
  round,
  date,
  upperStrength,
  upperFlexibility,
  lowerStrength,
  lowerFlexibility,
  tug,
  stationaryWalk,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between mb-4">
      <div className="flex flex-col">
        <div className="font-semibold">{round}</div>
        <div className="text-sm text-gray-600">{date}</div>
      </div>
      <div className="flex space-x-4 text-center">
        <div>
          <p>{upperStrength}</p>
          <p className="text-gray-600">Lv. 3</p>
        </div>
        <div>
          <p>{upperFlexibility}</p>
          <p className="text-gray-600">Lv. 3</p>
        </div>
        <div>
          <p>{lowerStrength}</p>
          <p className="text-gray-600">Lv. 3</p>
        </div>
        <div>
          <p>{lowerFlexibility}</p>
          <p className="text-gray-600">Lv. 3</p>
        </div>
        <div>
          <p>{tug}</p>
          <p className="text-gray-600">Lv. 3</p>
        </div>
        <div>
          <p>{stationaryWalk}</p>
          <p className="text-gray-600">Lv. 3</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className="text-blue-500 hover:text-blue-700">
          <i className="fas fa-edit"></i>
        </button>
        <button className="text-red-500 hover:text-red-700">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default RecordItem;
