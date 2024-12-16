"use client";

import React, { useRef, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import HexagonalChart from './chart/HexagonalChart'
import BarChartComponent from './chart/BarChartComponent'
import HexagonalChart2 from './chart/HexagonalChart2'
import IndividualLineCharts from './chart/IndividualLineCharts'
import LevelTable from './chart/LevelTable'
import { useSearchParams } from 'next/navigation';
import { Member } from '@/types/member';
import { Report, DataItem, FirstRecord, Score  } from '@/types/report';
import SkeletonReport from '../organisms/SkeletonReport'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

const dummyData: DataItem[] = [
  { id: 1, name: '상체근력', score1: { value: 20, level: 3 }, score2: { value: 20, level: 3 }, score3: { value: 24, level: 3.2 } },
  { id: 2, name: '상체유연성', score1: { value: -28, level: 3 }, score2: { value: -30, level: 3.2 }, score3: { value: -10, level: 5 } },
  { id: 3, name: '하체근력', score1: { value: 11, level: 3 }, score2: { value: 17, level: 4 }, score3: { value: 20, level: 3.5 } },
  { id: 4, name: '하체유연성', score1: { value: 2.5, level: 3 }, score2: { value: 3.2, level: 2 }, score3: { value: 4, level: 4 } },
  { id: 5, name: '2분제자리걷기', score1: { value: 218, level: 3 }, score2: { value: 200, level: 3.2 }, score3: { value: 220, level: 3.6 } },
  { id: 6, name: 'TUG', score1: { value: 16, level: 3 }, score2: { value: 20, level: 3.6 }, score3: { value: 22, level: 3.8 } },
];

const PdfGenerator = ( { memberDetail, reportArr, selectedReport }: { memberDetail: Member, reportArr: Report[], selectedReport: Report | null } ) => {
  const today = new Date().toISOString().split('T')[0]; 
  const contentRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const additionalPageRef = useRef<HTMLDivElement>(null);

  const [recordDataArr, setRecordDataArr] = useState(dummyData)
 
  useEffect(()=>{
    if(selectedReport){
      // console.log(transformData(selectedReport.first_record, reportArr))
      setRecordDataArr(transformData(selectedReport.first_record, reportArr))
    }
  },[selectedReport])

  console.log(recordDataArr);
  

  const getUnit =(string: String) => {
    switch (string) {
      case "상체근력":
        return "회";
      case "상체유연성":
        return "cm";
      case "하체근력":
        return "회";
      case "하체유연성":
        return "cm";
      case "TUG":
        return "초";
      case "2분제자리걷기":
        return "회";
      default:
        return "";
    }
  }

  const [memberDetails, setMemberDetails] = useState<Member | null>(memberDetail);
  const searchParams = useSearchParams(); // 현재 경로의 쿼리 파라미터를 가져옵니다.
  const id = searchParams?.get('id') || '';  

  useEffect(() => {
    let searchParamsId = ""
    if (id) {
      searchParamsId = id
      // Fetch 요청 URL
    } else {
      searchParamsId = "GON_001"
    }
    fetch(`/api/member?member_id=${searchParamsId}`)
      .then((response) => response.json())
      .then((data) => setMemberDetails(data[0]))
      .catch((error) => console.error('Failed to fetch member details:', error));
  }, [id]); // Dependency array includes id to refetch when id changes

  // if (!memberDetails) return <></>;
  if (!memberDetails) return <SkeletonReport />;
    
  
  const TableComponent = () => {
    return (
      <div className="overflow-x-auto text-black">
        <table className="min-w-full bg-white border border-gray-300 text-sm"> {/* 테이블 폰트 크기 줄임 */}
          <thead>
            <tr>
              <th className="py-1 px-2 border-b bg-amber-200 text-left">항목</th>
              <th className="py-1 px-2 border-b bg-amber-200 text-left">1차 측정</th>
              <th className="py-1 px-2 border-b bg-amber-200 text-left">직전회차측정</th>
              <th className="py-1 px-2 border-b bg-amber-200 text-left">최근회차측정</th>
            </tr>
          </thead>
          <tbody>
            {recordDataArr.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-amber-50'} // 홀짝 줄 배경색
              >
                <td className="py-1 px-2 border-b font-bold">{item.name}</td>
                <td className="py-1 px-2 border-b font-bold">
                  {item.score1.value}
                  {getUnit(item.name)} <span className="font-bold text-teal-500">{"Lv_" + item.score1.level}</span>
                </td>
                <td className="py-1 px-2 border-b font-bold">
                  {item.score2.value}
                  {getUnit(item.name)} <span className="font-bold text-teal-500">{"Lv_" + item.score2.level}</span>
                </td>
                <td className="py-1 px-2 border-b font-bold">
                  {item.score3.value}
                  {getUnit(item.name)} <span className="font-bold text-teal-500">{"Lv_" + item.score3.level}</span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    );
  };





  const handleDownloadPdf = async () => {
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
  
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const scale = 2; // HTML 요소를 2배 해상도로 캡처
  
      // Helper function to capture and add pages
      const captureAndAddPage = async (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
          const canvas = await html2canvas(ref.current, {
            scale, // 고해상도로 캡처
            useCORS: true, // 외부 이미지 허용
          });
  
          const imageData = canvas.toDataURL("image/png");
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
          pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
  
          // 페이지 높이가 A4를 초과하면 다음 페이지로 이동
          if (imgHeight > pageHeight) {
            pdf.addPage();
          }
        }
      };
  
      // 1. Cover Page
      await captureAndAddPage(coverRef);
  
      
      // 3. Main Content Page
      pdf.addPage();
      await captureAndAddPage(contentRef);

      // 2. Additional Page
      pdf.addPage();
      await captureAndAddPage(additionalPageRef);
  
      // Save the PDF
      // pdf.save("generated.pdf");
      pdf.save(`${memberDetails.name}님 보고서.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handlereportSubmit = () => {
    console.log("보고서저장")
    // 코멘트 문구 상태 만들어서 이 지점 최종 저장

  }


  return (
    <div className='flex flex-col bg-gray-100'>
      {/* <Header>
        {undefined}
      </Header> */}

      <div className="flex flex-col p-10 bg-gray-100 min-h-screen">
          {/* Cover Page */}
        <div ref={coverRef} className="bg-white p-14 shadow-lg mx-auto">

          <header className="relative">
            {/* 제목 */}
            <div className="text-center">
              <div className="absolute left-0 top-0 w-2 h-full bg-amber-400"></div>
              <h2 className="text-2xl font-bold mb-5 text-amber-700">{getInstitutionName(memberDetails.center)}</h2>
              <h1 className="text-4xl font-bold mb-5 text-black">체력측정 검사 결과지</h1>
              <div className="absolute right-0 top-0 w-2 h-full bg-amber-400"></div>
            </div>
          </header>

          <div className="grid grid-cols-2 gap-10 text-black mt-20">
            {/* 측정일 */}
            <div className="bg-amber-100 p-10 rounded-lg">
              <div className="mb-3">
                <p className="text-lg font-bold">보고서 작성일</p>
                <p className="text-xl font-bold text-amber-700">{today}</p>
              </div>
              <div className="mb-3">
                <p className="text-lg font-bold text-amber-100">보고서 작성자</p>
                <p className="text-xl font-bold text-amber-100">홍길동</p>
              </div>
            </div>

            {/* 센터명, 이름, 생년월일 */}
            <div className="bg-amber-100 p-10 rounded-lg">
              <div className="mb-3">
                <p className="text-lg font-bold">이름</p>
                <p className="text-xl font-bold text-amber-700">{memberDetails.name}님</p>
              </div>
              <div>
                <p className="text-lg font-bold">생년월일</p>
                <p className="text-xl font-bold text-amber-700">{memberDetails.date_of_birth}</p>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-amber-400 my-5"></div>

          {/* 그래프 섹션 */}
          <section className="mb-8 flex flex-row">
            {/* 최초기록 */}
            <HexagonalChart dummyData={recordDataArr} />
            {/* 최근기록 */}
            <HexagonalChart2 dummyData={recordDataArr}/>

          </section>
  
          {/* 체력장 상태 */}
          <section className="m-2">
             <div className="flex items-center text-lg my-4">
               <p className="font-bold mb-2 text-black">체력장 측정 결과 {memberDetails.name} 어르신의 상태는&nbsp;</p>
               <p className="text-red-600 mb-2 font-bold underline">양호</p>
               <p className="font-bold mb-2 text-black">&nbsp;입니다.</p>
             </div>
          </section>

          <div className="bg-yellow-400 p-4 rounded-lg">
            <h2 className="text-white font-bold text-lg mb-2">Comments</h2>
            <textarea
              className="w-full h-40 p-2 border rounded-md text-black"
              placeholder="코멘트를 입력하세요."
            ></textarea>
          </div>

          {/* 아이콘 및 설명 섹션 */}
          <section className="grid grid-cols-3 gap-4 text-center m-8">
            <div>
            <h3 className="font-bold text-white">경덕재 </h3>
            <p className="text-sm text-white">일어서기▶3m걷기▶회전▶3m걷기▶앉기</p>
            </div>
          </section>


        </div>
      </div>

{/* 두 번째 페이지 */}
      <div className="flex flex-col p-10 bg-gray-100 min-h-screen">
        
        <div ref={contentRef} className="bg-white p-14 shadow-lg mx-auto">
       
          {/* 상단 로고 및 선 추가 */}
          <header className="flex items-center mb-8 relative">
            <div className="flex items-center">
              {/* <span className="text-lg font-bold text-black">경덕재 곤지암점</span> */}
              <span className="text-lg font-bold text-black">{getInstitutionName(memberDetails.center)}</span>
            </div>
            <div className="flex-grow ml-4 border-t-2 border-amber-400"></div>
            <div className="w-6 h-6 bg-amber-400 absolute right-0 top-0"></div>
          </header>
  
          {/* 제목 */}
          <h1 className="text-3xl font-bold text-center mb-8 text-black">{memberDetails.name}님 세부 측정 결과</h1>
  
          {/* 그래프 섹션 */}
          <section className="mb-8">
            {/* <BarChartComponent dataItems={dummyData} /> */}
            <BarChartComponent dataItems={recordDataArr} />
          </section>
  
         <h2 className="text-sm font-bold text-black my-4">최초 및 최근 기록 상세 내용</h2>
          <TableComponent />

          {/* 아이콘 및 설명 섹션 */}
          <section className="grid grid-cols-3 gap-4 text-center m-8">
            <div>
              <div className="bg-amber-300 text-white rounded-full h-16 w-16 mx-auto mb-4 flex justify-center items-center">
                <i className="fas fa-hand-pointer text-2xl"></i>
              </div>
              <h3 className="font-bold text-teal-500">상체근력</h3>
              <p className="text-sm text-gray-600">n분동안 윗몸일으키기</p>
            </div>
            <div>
              <div className="bg-amber-300 text-white rounded-full h-16 w-16 mx-auto mb-4 flex justify-center items-center">
                <i className="fas fa-heart text-2xl"></i>
              </div>
              <h3 className="font-bold text-teal-500">상체유연성</h3>
              <p className="text-sm text-gray-600">설명 필요</p>
            </div>
            <div>
              <div className="bg-amber-300 text-white rounded-full h-16 w-16 mx-auto mb-4 flex justify-center items-center">
                <i className="fas fa-chart-bar text-2xl"></i>
              </div>
              <h3 className="font-bold text-teal-500">하체근력</h3>
              <p className="text-sm text-gray-600">설명 필요</p>
            </div>
            <div>
              <div className="bg-amber-300 text-white rounded-full h-16 w-16 mx-auto mb-4 flex justify-center items-center">
                <i className="fas fa-chart-bar text-2xl"></i>
              </div>
              <h3 className="font-bold text-teal-500">하체유연성</h3>
              <p className="text-sm text-gray-600">설명 필요</p>
            </div>
            <div>
              <div className="bg-amber-300 text-white rounded-full h-16 w-16 mx-auto mb-4 flex justify-center items-center">
                <i className="fas fa-chart-bar text-2xl"></i>
              </div>
              <h3 className="font-bold text-teal-500">TUG</h3>
              <p className="text-sm text-gray-600">일어서기▶3m걷기▶회전▶3m걷기▶앉기</p>
            </div>
            <div>
              <div className="bg-amber-300 text-white rounded-full h-16 w-16 mx-auto mb-4 flex justify-center items-center">
                <i className="fas fa-chart-bar text-2xl"></i>
              </div>
              <h3 className="font-bold text-teal-500">2분제자리걷기</h3>
              <p className="text-sm text-gray-600">2분동안 제자리 걷기 횟수</p>
            </div>
          </section>
        </div>

  {/* 세 번째 페이지 */}
      <div className="flex flex-col p-10 bg-gray-100 min-h-screen">
        <div ref={additionalPageRef} className="bg-white p-14 shadow-lg mx-auto">
       
          {/* 상단 로고 및 선 추가 */}
          <header className="flex items-center mb-8 relative">
            <div className="flex items-center">
              {/* <span className="text-lg font-bold text-black">경덕재 곤지암점</span> */}
              <span className="text-lg font-bold text-black">{getInstitutionName(memberDetails.center)}</span>
            </div>
            <div className="flex-grow ml-4 border-t-2 border-amber-400"></div>
            <div className="w-6 h-6 bg-amber-400 absolute right-0 top-0"></div>
          </header>
  
          {/* 제목 */}
          <h1 className="text-3xl font-bold text-center mb-8 text-black">{memberDetails.name}님 최근 5회차 기록</h1>
  
          {/* 그래프 섹션 */}
          <section className="">
            <IndividualLineCharts reportArr={reportArr}/>
          </section>
  
         <h2 className="text-lg font-bold text-black mt-2">측정검사 별 구간(Level)기준</h2>
          <LevelTable />

        </div>
      </div>
    {/* 세 번째 페이지 */}

        {/* 버튼을 가운데로 정렬하는 부분 */}
        <div className="flex justify-center">
          <button
            onClick={handleDownloadPdf}
            className="font-bold px-4 py-2 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-600 max-w-[11vw] mx-5"
          >
            PDF 다운로드
          </button>
          <button
            onClick={handlereportSubmit}
            className="font-bold px-4 py-2 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-600 max-w-[11vw] mx-5"
          >
            보고서 저장
          </button>
        </div>

      </div>
    </div>
  );
};

export default PdfGenerator;

// Chart.js 필수 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['상체근력', '상체유연성', '하체근력', '하체유연성', 'TUG', '2분제자리걷기'],
  datasets: [
    {
      label: '최초기록',
      data: [3, 4.5, 2, 3, 2, 3],
      backgroundColor: '#00bfae', // 차트 색상
    },
    {
      label: '직전기록',
      data: [5, 3.5, 2.2, 3, 3.2, 4],
      backgroundColor: '#f39c12', // 차트 색상
    },
    {
      label: '최근기록',
      data: [3, 2, 4, 2.1, 4.3, 2.5],
      backgroundColor: '#ff6347', // 차트 색상
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
        stepSize: 5,
      },
    },
  },
};

// const BarChartComponent = () => {
//   return (
//     <div className="w-full">
//       <div className="bg-amber-50 w-full mb-4">
//         <Bar data={data} options={options} />
//       </div>
//     </div>
//   );
// };


function getInstitutionName(code: string): string {
  switch (code) {
    case 'GON':
      return '경덕재 곤지암점';
    case 'YAN':
      return '경덕재 양벌점';
    case 'YEO':
      return '경덕재 여주점';
    case 'OPO':
      return '경덕재 오포점';
    case 'TCH':
      return '경덕재 퇴촌점';
    case 'ROA':
      return '너싱홈 로아점';
    case 'HAE':
      return '너싱홈 해원';
    case 'ROAD':
      return '로아주간보호';
    default:
      return '알 수 없는 기관';
  }
}

// interface Score {
//   level: number;
//   value: number;
// }

// interface DataItem {
//   id: number;
//   name: string;
//   score1: Score;
//   score2: Score;
//   score3: Score;
// }

const transformData = (first_record: FirstRecord | null, reportArr: Report[]): DataItem[] => {
  if (!first_record) return dummyData;
  if (!reportArr || reportArr.length === 0) return dummyData;

  // 가장 최근 기록과 직전 기록 설정
  const recentRecord = reportArr[0].record_5th[0] || {};
  const previousRecord = reportArr[0].record_5th[1] || {};

  // 안전하게 값 파싱하는 함수
  const parseScore = (field: { level: string; value: string }): Score => {
    try {
      const level = JSON.parse(field.level).level || 0;
      const value = JSON.parse(field.value).value || 0;
      return { level, value };
    } catch {
      return { level: 0, value: 0 };
    }
  };

  try {
    return [
      {
        id: 1,
        name: '상체근력',
        score1: parseScore(first_record.upper_body_strength),
        score2: parseScore(previousRecord.upper_body_strength),
        score3: parseScore(recentRecord.upper_body_strength),
      },
      {
        id: 2,
        name: '상체유연성',
        score1: parseScore(first_record.upper_body_flexibility),
        score2: parseScore(previousRecord.upper_body_flexibility),
        score3: parseScore(recentRecord.upper_body_flexibility),
      },
      {
        id: 3,
        name: '하체근력',
        score1: parseScore(first_record.lower_body_strength),
        score2: parseScore(previousRecord.lower_body_strength),
        score3: parseScore(recentRecord.lower_body_strength),
      },
      {
        id: 4,
        name: '하체유연성',
        score1: parseScore(first_record.lower_body_flexibility),
        score2: parseScore(previousRecord.lower_body_flexibility),
        score3: parseScore(recentRecord.lower_body_flexibility),
      },
      {
        id: 5,
        name: '2분제자리걷기',
        score1: parseScore(first_record.walking_distance),
        score2: parseScore(previousRecord.walking_distance),
        score3: parseScore(recentRecord.walking_distance),
      },
      {
        id: 6,
        name: 'TUG',
        score1: parseScore(first_record.tug),
        score2: parseScore(previousRecord.tug),
        score3: parseScore(recentRecord.tug),
      },
    ];
  } catch (error) {
    console.error('Data transformation error:', error);
    return dummyData;
  }
};

// // 데이터를 변환하는 함수
// const transformData = (first_record: FirstRecord | null, reportArr: Report[]): DataItem[] => {
//   if (!first_record) return dummyData;
//   if (!reportArr) return dummyData;

//   // 가장 최근 기록이 0번째 인덱스
//   const recentRecord = reportArr[0].record_5th[0]
//   // 직전 회차 기록이 1번째 인덱스
//   const previousRecord = reportArr[0].record_5th[1]

//   // score1 최초 측정기록
//   // score2 직전회차 측정기록
//   // score3 가장최근 측정기록
  
//   try {
//     return [
//       {
//         id: 1,
//         name: '상체근력',
//         score1: { 
//           value: JSON.parse(first_record.upper_body_strength.value), 
//           level: JSON.parse(first_record.upper_body_strength.level) 
//         },
//         score2: { 
//           value: JSON.parse(previousRecord.upper_body_strength.value), 
//           level: JSON.parse(previousRecord.upper_body_strength.level) 
//         },
//         score3: { 
//           value: JSON.parse(recentRecord.upper_body_strength.value), 
//           level: JSON.parse(recentRecord.upper_body_strength.level) 
//         },
//       },
//       {
//         id: 2,
//         name: '상체유연성',
//         score1: { 
//           value: JSON.parse(first_record.upper_body_flexibility.value), 
//           level: JSON.parse(first_record.upper_body_flexibility.level) 
//         },
//         score2: { 
//           value: JSON.parse(previousRecord.upper_body_flexibility.value), 
//           level: JSON.parse(previousRecord.upper_body_flexibility.level) 
//         },
//         score3: { 
//           value: JSON.parse(recentRecord.upper_body_flexibility.value), 
//           level: JSON.parse(recentRecord.upper_body_flexibility.level) 
//         },
//       },
//       {
//         id: 3,
//         name: '하체근력',
//         score1: { 
//           value: JSON.parse(first_record.lower_body_strength.value), 
//           level: JSON.parse(first_record.lower_body_strength.level) 
//         },
//         score2: { 
//           value: JSON.parse(previousRecord.lower_body_strength.value), 
//           level: JSON.parse(previousRecord.lower_body_strength.level) 
//         },
//         score3: { 
//           value: JSON.parse(recentRecord.lower_body_strength.value), 
//           level: JSON.parse(recentRecord.lower_body_strength.level) 
//         },
//       },
//       {
//         id: 4,
//         name: '하체유연성',
//         score1: { 
//           value: JSON.parse(first_record.lower_body_flexibility.value), 
//           level: JSON.parse(first_record.lower_body_flexibility.level) 
//         },
//         score2: { 
//           value: JSON.parse(previousRecord.lower_body_flexibility.value), 
//           level: JSON.parse(previousRecord.lower_body_flexibility.level) 
//         },
//         score3: { 
//           value: JSON.parse(recentRecord.lower_body_flexibility.value), 
//           level: JSON.parse(recentRecord.lower_body_flexibility.level) 
//         },
//       },
//       {
//         id: 5,
//         name: '2분제자리걷기',
//         score1: { 
//           value: JSON.parse(first_record.walking_distance.value), 
//           level: JSON.parse(first_record.walking_distance.level) 
//         },
//         score2: { 
//           value: JSON.parse(previousRecord.walking_distance.value), 
//           level: JSON.parse(previousRecord.walking_distance.level) 
//         },
//         score3: { 
//           value: JSON.parse(recentRecord.walking_distance.value), 
//           level: JSON.parse(recentRecord.walking_distance.level) 
//         },
//       },
//       {
//         id: 6,
//         name: 'TUG',
//         score1: { 
//           value: JSON.parse(first_record.tug.value), 
//           level: JSON.parse(first_record.tug.level) 
//         },
//         score2: { 
//           value: JSON.parse(previousRecord.tug.value), 
//           level: JSON.parse(previousRecord.tug.level) 
//         },
//         score3: { 
//           value: JSON.parse(recentRecord.tug.value), 
//           level: JSON.parse(recentRecord.tug.level) 
//         },
//       },
//     ];
//   } catch (error) {
//     console.error('Data transformation error:', error);
//     return dummyData;
//   }
// };
