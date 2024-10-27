// pages/api/reportData.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface ReportData {
  이름: string;
  작성날짜: string;
  그래프데이터: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      fill: boolean;
    }>;
  };
  최초측정데이터: {
    상체근력: number;
    하체유연성: number;
    상체유연성: number;
    TUG: number;
    제자리걷기: number;
  };
  최근측정데이터: {
    상체근력: number;
    하체유연성: number;
    상체유연성: number;
    TUG: number;
    제자리걷기: number;
  };
  하단문구: string;
  코멘트: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ReportData>) {
  const reportData: ReportData = {
    이름: "박여울",
    작성날짜: "2023-10-23",
    그래프데이터: {
      labels: ["2019", "2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: "상체근력",
          data: [5, 9, 7, 10, 12],
          borderColor: "#00bfae",
          backgroundColor: "rgba(0, 191, 174, 0.5)",
          fill: true,
        },
        {
          label: "상체유연성",
          data: [10, 8, 12, 14, 13],
          borderColor: "#999999",
          backgroundColor: "rgba(153, 153, 153, 0.5)",
          fill: true,
        },
        {
          label: "하체근력",
          data: [12, 11, 10, 15, 18],
          borderColor: "#ff6347",
          backgroundColor: "rgba(255, 99, 71, 0.5)",
          fill: true,
        },
        {
          label: "하체유연성",
          data: [8, 6, 5, 7, 8],
          borderColor: "#f39c12",
          backgroundColor: "rgba(243, 156, 18, 0.5)",
          fill: true,
        },
        {
          label: "TUG",
          data: [15, 13, 12, 11, 14],
          borderColor: "#9b59b6",
          backgroundColor: "rgba(155, 89, 182, 0.5)",
          fill: true,
        },
        {
          label: "2분제자리",
          data: [7, 8, 10, 12, 9],
          borderColor: "#3498db",
          backgroundColor: "rgba(52, 152, 219, 0.5)",
          fill: true,
        },
      ],
    },
    최초측정데이터: {
      상체근력: 5,
      하체유연성: 8,
      상체유연성: 10,
      TUG: 15,
      제자리걷기: 7,
    },
    최근측정데이터: {
      상체근력: 12,
      하체유연성: 8,
      상체유연성: 13,
      TUG: 14,
      제자리걷기: 9,
    },
    하단문구: "이 보고서는 체력 향상에 대한 개요를 제공합니다.",
    코멘트: "전반적으로 개선이 되었으나 하체 유연성에서 약간의 퇴보가 있음.",
  };
  res.status(200).json(reportData);
}
