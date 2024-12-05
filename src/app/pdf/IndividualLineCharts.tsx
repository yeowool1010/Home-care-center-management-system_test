import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Chart.js에 필요한 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const individualData = [
  {
    label: "상체근력",
    data: [20, 21, 19, 23, 25],
    borderColor: "#00bfae",
    backgroundColor: "rgba(0, 191, 174, 0.5)",
  },
  {
    label: "상체유연성",
    data: [-10, -8, -12, -14, -13],
    borderColor: "#999999",
    backgroundColor: "rgba(153, 153, 153, 0.5)",
  },
  {
    label: "하체근력",
    data: [12, 11, 10, 15, 18],
    borderColor: "#ff6347",
    backgroundColor: "rgba(255, 99, 71, 0.5)",
  },
  {
    label: "하체유연성",
    data: [4, 3, -2, 4, 3],
    borderColor: "#f39c12",
    backgroundColor: "rgba(243, 156, 18, 0.5)",
  },
  {
    label: "TUG",
    data: [15, 13, 12, 11, 14],
    borderColor: "#9b59b6",
    backgroundColor: "rgba(155, 89, 182, 0.5)",
  },
  {
    label: "2분제자리걷기",
    data: [200, 210, 180, 200, 223],
    borderColor: "#3498db",
    backgroundColor: "rgba(52, 152, 219, 0.5)",
  },
];

const labels = ["2024-05-01", "2024-06-01", "2024-07-01", "2024-08-01", "2024-09-01"];

const IndividualLineCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-3 ">
      {individualData.map((dataset, index) => (
        <div key={index} className="bg-gray-50 shadow-lg p-4 rounded-lg">
          <h2 className="text-lg font-bold text-center mb-4 text-black">{dataset.label}</h2>
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: dataset.label,
                  data: dataset.data,
                  borderColor: dataset.borderColor,
                  backgroundColor: dataset.backgroundColor,
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: false },
              },
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default IndividualLineCharts;
