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
import { Report, DataItem, FirstRecord, ReportDate  } from '@/types/report';

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

const IndividualLineCharts = ({ reportArr }: { reportArr: ReportDate[]; }) => {
const { individualData, labels } = processReportData(reportArr);

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

type IndividualDataItem = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
};

const initialIndividualData: IndividualDataItem[] = [
  { label: "상체근력", data: [], borderColor: "#00bfae", backgroundColor: "rgba(0, 191, 174, 0.5)" },
  { label: "상체유연성", data: [], borderColor: "#1A237E", backgroundColor: "rgba(26, 35, 126, 0.5)" },
  { label: "하체근력", data: [], borderColor: "#ff6347", backgroundColor: "rgba(255, 99, 71, 0.5)" },
  { label: "하체유연성", data: [], borderColor: "#f39c12", backgroundColor: "rgba(243, 156, 18, 0.5)" },
  { label: "TUG", data: [], borderColor: "#9b59b6", backgroundColor: "rgba(155, 89, 182, 0.5)" },
  { label: "2분제자리걷기", data: [], borderColor: "#3498db", backgroundColor: "rgba(52, 152, 219, 0.5)" },
];

const processReportData = (reportArr: ReportDate[]) => {
    // 초기 labels 배열 생성
  const recentReport = reportArr[0]?.record_5th;
  
  // labels 배열 생성
  let labels = recentReport?.map((report) => report.measurement_date);

  // 5개 이하일 경우 나머지 자리를 '0'으로 채움
  // while (labels.length < 5) {
  //   labels.push("기록없음");
  // }
  while (recentReport?.length < 5) {
    labels.push("기록없음");
  }

  // 데이터 초기화 (타입 명시)
  const individualData: IndividualDataItem[] = [
    { label: "상체근력", data: [], borderColor: "#00bfae", backgroundColor: "rgba(0, 191, 174, 0.5)" },
    { label: "상체유연성", data: [], borderColor: "#1A237E", backgroundColor: "rgba(26, 35, 126, 0.5)" },
    { label: "하체근력", data: [], borderColor: "#ff6347", backgroundColor: "rgba(255, 99, 71, 0.5)" },
    { label: "하체유연성", data: [], borderColor: "#f39c12", backgroundColor: "rgba(243, 156, 18, 0.5)" },
    { label: "2분제자리걷기", data: [], borderColor: "#3498db", backgroundColor: "rgba(52, 152, 219, 0.5)" },
    { label: "TUG", data: [], borderColor: "#9b59b6", backgroundColor: "rgba(155, 89, 182, 0.5)" },
  ];

  // 데이터 채우기
  recentReport?.forEach((report) => {
    individualData[0].data.push(parseJsonValue(report.upper_body_strength));
    individualData[1].data.push(parseJsonValue(report.upper_body_flexibility));
    individualData[2].data.push(parseJsonValue(report.lower_body_strength));
    individualData[3].data.push(parseJsonValue(report.lower_body_flexibility));
    individualData[4].data.push(parseJsonValue(report.tug));
    individualData[5].data.push(parseJsonValue(report.walking_distance));
  });

  // 각 data 배열을 길이 5로 맞추기 (부족한 부분은 0으로 채움)
  individualData.forEach((item) => {
    while (item.data.length < 5) {
      item.data.push(0);
    }
  });

  return { individualData, labels };
};

// JSON 문자열에서 값 파싱하는 함수
const parseJsonValue = (field: { level: string; value: string } | undefined): number => {
  if (!field || !field.value) return 0;

  try {
    const parsed = JSON.parse(field.value);
    return parsed.value || 0;
  } catch (error) {
    return 0;
  }
};
