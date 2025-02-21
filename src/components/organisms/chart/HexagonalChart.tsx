import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js에 필요한 요소 등록
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Props 타입 정의
interface HexagonalChartProps {
  dummyData: {
    id: number;
    name: string;
    score1: { value: number; level: number };
    score2: { value: number; level: number };
    score3: { value: number; level: number };
  }[];
}

const HexagonalChart: React.FC<HexagonalChartProps> = ({ dummyData }) => {
  // const data1 = 20
  const data1 = {value: dummyData[0].score1.value, level: dummyData[0].score1.level}
  const data2 = {value: dummyData[1].score1.value, level: dummyData[1].score1.level}
  const data3 = {value: dummyData[2].score1.value, level: dummyData[2].score1.level}
  const data4 = {value: dummyData[3].score1.value, level: dummyData[3].score1.level}
  const data5 = {value: dummyData[4].score1.value, level: dummyData[4].score1.level}
  const data6 = {value: dummyData[5].score1.value, level: dummyData[5].score1.level}
  // 데이터 타입 정의
  const data = {
    labels: [`上근력(${data1.value})`, `上유연성(${data2.value})`, `下근력(${data3.value})`, `下유연성(${data4.value})`, `2분걷기(${data5.value})`, `TUG(${data6.value})`],
    datasets: [
      {
        label: "최초기록",
        data: [data1.level, data2.level, data3.level, data4.level, data5.level, data6.level],
        backgroundColor: "rgba(0, 191, 174, 0.5)", // 반투명 녹색
        borderColor: "#00bfae", // 녹색 테두리
        borderWidth: 2,
      },
    ],
  };

  // 옵션 타입 정의
  const options = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          display: true, // 방사형 축의 각도선 표시
        },
        suggestedMin: 0, // 최소값
        suggestedMax: 6, // 최대값
        ticks: {
          stepSize: 1, // 값 간격
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // 격자선 색상
        },
        pointLabels: {
          font: {
            size: 14, // 라벨 크기
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const, // 범례 위치
      },
    },
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Radar data={data} options={options} />
    </div>
  );
};

export default HexagonalChart;
