"use client";

import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Image from 'next/image';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart.js 필수 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// 예시 데이터: 시기별 6개 항목
const data = {
  labels: ['2019', '2020', '2021', '2022', '2023'],
  datasets: [
    {
      label: '상체근력',
      data: [5, 9, 7, 10, 12],
      borderColor: '#00bfae',
      backgroundColor: 'rgba(0, 191, 174, 0.5)',
      fill: true,
    },
    {
      label: '상체유연성',
      data: [10, 8, 12, 14, 13],
      borderColor: '#999999',
      backgroundColor: 'rgba(153, 153, 153, 0.5)',
      fill: true,
    },
    {
      label: '하체근력',
      data: [12, 11, 10, 15, 18],
      borderColor: '#ff6347',
      backgroundColor: 'rgba(255, 99, 71, 0.5)',
      fill: true,
    },
    {
      label: '하체유연성',
      data: [8, 6, 5, 7, 8],
      borderColor: '#f39c12',
      backgroundColor: 'rgba(243, 156, 18, 0.5)',
      fill: true,
    },
    {
      label: 'TUG',
      data: [15, 13, 12, 11, 14],
      borderColor: '#9b59b6',
      backgroundColor: 'rgba(155, 89, 182, 0.5)',
      fill: true,
    },
    {
      label: '2분제자리',
      data: [7, 8, 10, 12, 9],
      borderColor: '#3498db',
      backgroundColor: 'rgba(52, 152, 219, 0.5)',
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        font: {
          size: 12, // 범례 텍스트 크기 줄임
        },
      },
    },
    title: {
      display: true,
      text: '홍길동님 최근 5년 체력장 기록',
      font: {
        size: 12, // 차트 제목 크기 줄임
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 10, // x축 글씨 크기 줄임
        },
      },
    },
    y: {
      beginAtZero: true,
      max: 20,
      ticks: {
        stepSize: 5,
        font: {
          size: 10, // y축 숫자 크기 줄임
        },
      },
    },
  },
};

const LineChartComponent = () => {
  return (
    <div className="w-fit">
      <h1 className="text-sm font-bold text-center mb-6 text-teal-500">홍길동님은 센터 내 상위 "00%" 입니다.</h1>
      <div className="bg-gray-200 w-full mb-2 items-center" style={{ height: '300px' }}> {/* 차트 높이 줄임 */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

const PdfGenerator = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const content = contentRef.current;

    if (!content) return;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const canvas = await html2canvas(content, { scale: 2 });
    const imageData = canvas.toDataURL('image/png');

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imageData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imageData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save('generated.pdf');
  };

  return (
    <div className="flxe flex-col p-6 bg-gray-100 min-h-screen">
      <div ref={contentRef} className="bg-white p-4 shadow-lg mx-auto">
        {/* 상단 로고 및 선 추가 */}
        <header className="flex items-center mb-6 relative">
          <div className="flex items-center">
            <p className="text-sm text-black">로고</p>
            <span className="text-sm font-bold text-black">경덕재 주간보호센터 기관명1</span>
          </div>
          <div className="flex-grow ml-2 border-t-2 border-teal-500"></div>
          <div className="w-4 h-8 bg-teal-500 absolute right-0 top-0"></div> {/* 상단 박스 크기 축소 */}
        </header>

        {/* 제목 */}
        <h1 className="text-base font-bold text-center mb-4 text-black">2024년 9월 7일 홍길동님 보고서</h1>

        {/* 그래프 섹션 */}
        <section className="mb-4">
          <LineChartComponent />
        </section>

        {/* 체력장 섹션 */}
        <h2 className="text-sm font-bold text-black">홍길동님 체력장</h2>
        <TableComponent />

        {/* 체력장 상태 */}
        <section className="mb-4">
          <div className="flex items-center text-sm my-4">
            <p className="font-bold mb-2 text-black">체력장 측정 결과 홍길동 어르신의 상태는&nbsp;</p>
            <p className="text-red-600 mb-2 font-bold underline">양호</p>
            <p className="font-bold mb-2 text-black">&nbsp;입니다.</p>
          </div>
        </section>

        {/* 하단 색상 박스 및 코멘트 섹션 */}
        <div className="bg-teal-500 text-white p-4 mt-4">
          <h3 className="text-sm font-bold mb-2">Comments</h3>
          <textarea
            className="w-full h-16 p-2 text-black rounded-md"
            placeholder="Add your comments here"
          ></textarea>
        </div>

        <footer className="text-center text-gray-600 mt-6">
          <p className="text-xs">© Sample University</p>
        </footer>
      </div>

      {/* 버튼을 가운데로 정렬하는 부분 */}
      <div className="flex justify-center">
        <button
          onClick={handleDownloadPdf}
          className="mt-4 px-2 py-1 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-600 max-w-[10vw] text-sm"
        >
          PDF 다운로드
        </button>
      </div>
    </div>
  );
};

export default PdfGenerator;

const dummyData = [
  { id: 1, name: '상체근력', score: 7, category: 1, color: 3 },
  { id: 2, name: '상체유연성', score: 6, category: 2, color: 4 },
  { id: 3, name: '하체근력', score: 0, category: 2, color: 1 },
  { id: 4, name: '하체유연성', score: 7, category: 4, color: 3 },
  { id: 5, name: '2분제자리', score: 0, category: 1, color: 6 },
  { id: 6, name: 'TUG', score: 8, category: 1, color: 1 },
];

const TableComponent = () => {
  return (
    <div className="overflow-x-auto text-black">
      <table className="min-w-full bg-white border border-gray-300 text-sm"> {/* 테이블 폰트 크기 줄임 */}
        <thead>
          <tr>
            <th className="py-1 px-2 border-b border-gray-300 bg-gray-200 text-left">항목</th>
            <th className="py-1 px-2 border-b border-gray-300 bg-gray-200 text-left">1차 측정</th>
            <th className="py-1 px-2 border-b border-gray-300 bg-gray-200 text-left">직전회차측정</th>
            <th className="py-1 px-2 border-b border-gray-300 bg-gray-200 text-left">최근회차측정</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item) => (
            <tr key={item.id}>
              <td className="py-1 px-2 border-b border-gray-300">{item.name}</td>
              <td className="py-1 px-2 border-b border-gray-300">{item.score}</td>
              <td className="py-1 px-2 border-b border-gray-300">{item.category}</td>
              <td className="py-1 px-2 border-b border-gray-300">{item.color}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};







// 막대그래프

// "use client";

// import React, { useRef } from 'react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import Image from 'next/image';

// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Chart.js 필수 요소 등록
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const data = {
//   labels: ['2019', '2020', '2021', '2022', '2023'],
//   datasets: [
//     {
//       label: 'Teal Bars',
//       data: [5, 10, 7, 13, 11],
//       backgroundColor: '#00bfae', // 차트 색상
//     },
//     {
//       label: 'Gray Bars',
//       data: [7, 8, 12, 15, 10],
//       backgroundColor: '#999999', // 차트 색상
//     },
//   ],
// };

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//     },
//     title: {
//       display: true,
//       text: 'Performance over the years',
//     },
//   },
//   scales: {
//     y: {
//       beginAtZero: true,
//       max: 25,
//       ticks: {
//         stepSize: 5,
//       },
//     },
//   },
// };

// const BarChartComponent = () => {
//   return (
//     <div className="w-full">
//       <h1 className="text-3xl font-bold text-center mb-8">Research Proposal</h1>
//       <div className="bg-gray-200 w-full mb-4">
//         {/* Bar Chart */}
//         <Bar data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// const PdfGenerator = () => {
//   const contentRef = useRef<HTMLDivElement>(null);

//   const handleDownloadPdf = async () => {
//     const content = contentRef.current;

//     if (!content) return;

//     const canvas = await html2canvas(content);
//     const imageData = canvas.toDataURL('image/png');

//     const pdf = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4',
//     });

//     const imgWidth = 210;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     pdf.addImage(imageData, 'PNG', 0, 0, imgWidth, imgHeight);
//     pdf.save('generated.pdf');
//   };

//   return (
//     <div className="flex flex-col p-10 bg-gray-100 min-h-screen">
//       <div ref={contentRef} className="bg-white p-6 shadow-lg mx-auto">
//         {/* 상단 로고 및 선 추가 */}
//         <header className="flex items-center mb-8 relative">
//           <div className="flex items-center">
//             <Image src="/path-to-logo.png" alt="logo" width={40} height={40} className="mr-2" />
//             <span className="text-lg font-bold">Sample University</span>
//           </div>
//           <div className="flex-grow ml-4 border-t-2 border-teal-500"></div>
//           <div className="w-6 h-10 bg-teal-500 absolute right-0 top-0"></div>
//         </header>

//         {/* 제목 */}
//         <h1 className="text-3xl font-bold text-center mb-8">Research Proposal</h1>

//         {/* 그래프 섹션 */}
//         <section className="mb-8">
//           <BarChartComponent />
//           <div className="text-center mb-4">
//             <h2 className="text-xl font-bold">Performance over the years</h2>
//           </div>
//           <div className="bg-gray-200 w-full h-40 mb-4 flex justify-center items-center">
//             <p className="text-gray-600">Graph Placeholder</p>
//           </div>
//         </section>

//         {/* 아이콘 및 설명 섹션 */}
//         <section className="grid grid-cols-3 gap-4 text-center mb-8">
//           <div>
//             <div className="bg-teal-500 text-white rounded-full h-16 w-16 mx-auto mb-4 flex justify-center items-center">
//               <i className="fas fa-hand-pointer text-2xl"></i>
//             </div>
//             <h3 className="font-bold">Professional Service</h3>
//             <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet.</p>
//           </div>
//           <div>
//             <div className="bg-teal-500 text-white rounded-full h-16 w-16 mx-auto mb-4 flex justify-center items-center">
//               <i className="fas fa-heart text-2xl"></i>
//             </div>
//             <h3 className="font-bold">Information Technology</h3>
//             <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet.</p>
//           </div>
//           <div>
//             <div className="bg-teal-500 text-white rounded-full h-16 w-16 mx-auto mb-4 flex justify-center items-center">
//               <i className="fas fa-chart-bar text-2xl"></i>
//             </div>
//             <h3 className="font-bold">Accounting Management</h3>
//             <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet.</p>
//           </div>
//         </section>

//         {/* Challenges 섹션 */}
//         <section className="mb-8">
//           <h2 className="text-xl font-bold mb-4">CHALLENGES</h2>
//           <p className="text-gray-600">
//             Fight needs two web sites to promote both the magazine and sponsored events. Fight Magazine needs an
//             e-commerce web site. Fight needs a web site to promote the events.
//           </p>
//         </section>

//         {/* Footer */}
//         <footer className="text-center text-gray-600 mt-12">
//           <p>© Sample University</p>
//         </footer>

//         {/* 하단 색상 박스 및 코멘트 섹션 */}
//         <div className="bg-teal-500 text-white p-6 mt-10">
//           <h3 className="text-lg font-bold mb-2">Comments</h3>
//           <textarea
//             className="w-full h-24 p-2 text-black rounded-md"
//             placeholder="Add your comments here"
//           ></textarea>
//         </div>
//       </div>

//       {/* 버튼을 가운데로 정렬하는 부분 */}
//       <div className="flex justify-center">
//         <button
//           onClick={handleDownloadPdf}
//           className="mt-10 px-4 py-2 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-600 max-w-[10vw]"
//         >
//           PDF 다운로드
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PdfGenerator;
