import React from "react";

const LevelTable: React.FC = () => {
  const data = [
    {
      level: "1구간(Level)",
      upperStrength: "0회 ~ 2회",
      upperFlexibility: "-8.1 이하",
      lowerStrength: "0회 ~ 1회",
      lowerFlexibility: "-6.1 이하",
      tug: "36초 이상",
      walking: "50회 이하",
    },
    {
      level: "2구간(Level)",
      upperStrength: "3회 ~ 4회",
      upperFlexibility: "-8.0 ~ -5.1",
      lowerStrength: "2회 ~ 3회",
      lowerFlexibility: "-6.0 ~ -4.1",
      tug: "26초 ~ 35.9초",
      walking: "50회 ~ 90회",
    },
    {
      level: "3구간(Level)",
      upperStrength: "5회 ~ 7회",
      upperFlexibility: "-5.0 ~ -2.6",
      lowerStrength: "4회 ~ 5회",
      lowerFlexibility: "-4.0 ~ -2.1",
      tug: "21초 ~ 25.9초",
      walking: "91회 ~ 130회",
    },
    {
      level: "4구간(Level)",
      upperStrength: "8회 ~ 10회",
      upperFlexibility: "-2.5 ~ -0.1",
      lowerStrength: "6회 ~ 8회",
      lowerFlexibility: "-2.0 ~ +0.4",
      tug: "16초 ~ 20초",
      walking: "131회 ~ 170회",
    },
    {
      level: "5구간(Level)",
      upperStrength: "11회 ~ 14회",
      upperFlexibility: "0 ~ +1.4",
      lowerStrength: "9회 ~ 11회",
      lowerFlexibility: "+0.5 ~ +2.4",
      tug: "11초 ~ 15.9초",
      walking: "171회 ~ 199회",
    },
    {
      level: "6구간(Level)",
      upperStrength: "15회 이상",
      upperFlexibility: "+1.5 이상",
      lowerStrength: "12회 이상",
      lowerFlexibility: "+2.5 이상",
      tug: "10.9초 이하",
      walking: "200회 이상",
    },
  ];

  return (
    <div className="overflow-x-auto p-4 text-black">
      <table className="min-w-full table-auto border-collapse border border-amber-300 text-sm">
        <thead className="bg-amber-200">
          <tr>
            <th className="border border-amber-300 px-4 py-2 text-center font-bold">
              측정검사 별 구간(Level)기준
            </th>
            <th className="border border-amber-300 px-4 py-2 text-center font-bold">
              상체근력
            </th>
            <th className="border border-amber-300 px-4 py-2 text-center font-bold">
              상체유연성
            </th>
            <th className="border border-amber-300 px-4 py-2 text-center font-bold">
              하체근력
            </th>
            <th className="border border-amber-300 px-4 py-2 text-center font-bold">
              하체유연성
            </th>
            <th className="border border-amber-300 px-4 py-2 text-center font-bold">
              TUG
            </th>
            <th className="border border-amber-300 px-4 py-2 text-center font-bold">
              2분제자리걷기
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-amber-100"}
            >
              <td className="border border-amber-300 px-4 py-2 text-center">
                {row.level}
              </td>
              <td className="border border-amber-300 px-4 py-2 text-center">
                {row.upperStrength}
              </td>
              <td className="border border-amber-300 px-4 py-2 text-center">
                {row.upperFlexibility}
              </td>
              <td className="border border-amber-300 px-4 py-2 text-center">
                {row.lowerStrength}
              </td>
              <td className="border border-amber-300 px-4 py-2 text-center">
                {row.lowerFlexibility}
              </td>
              <td className="border border-amber-300 px-4 py-2 text-center">
                {row.tug}
              </td>
              <td className="border border-amber-300 px-4 py-2 text-center">
                {row.walking}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LevelTable;
