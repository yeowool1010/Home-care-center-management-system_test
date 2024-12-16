'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart.js 필수 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Score {
  value: number;
  level: number;
}

interface DataItem {
  id: number;
  name: string;
  score1: Score;
  score2: Score;
  score3: Score;
}

interface BarChartComponentProps {
  dataItems: DataItem[];
}

const BarChartComponent = ({ dataItems }: BarChartComponentProps) => {
  // labels와 datasets을 생성
  const labels = dataItems.map((item) => item.name);

  const data = {
    labels,
    datasets: [
      {
        label: '최초기록',
        data: dataItems.map((item) => item.score1.level),
        backgroundColor: '#00bfae',
      },
      {
        label: '직전기록',
        data: dataItems.map((item) => item.score2.level),
        backgroundColor: '#f39c12',
      },
      {
        label: '최근기록',
        data: dataItems.map((item) => item.score3.level),
        backgroundColor: '#ff6347',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '최초 및 최근 기록 level 기준 그래프',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="w-full">
      <div className="bg-amber-50 w-full mb-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChartComponent;