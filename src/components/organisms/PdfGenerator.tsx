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
import { Report, DataItem, FirstRecord, Score, ReportDate  } from '@/types/report';
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
  { id: 1, name: '상체근력', score1: { value: 0, level: 0 }, score2: { value: 0, level: 0 }, score3: { value: 0, level: 0 } },
  { id: 2, name: '상체유연성', score1: { value: 0, level: 0 }, score2: { value: 0, level: 0 }, score3: { value: 0, level: 0 } },
  { id: 3, name: '하체근력', score1: { value: 0, level: 0 }, score2: { value: 0, level: 0 }, score3: { value: 0, level: 0 } },
  { id: 4, name: '하체유연성', score1: { value: 0, level: 0 }, score2: { value: 0, level: 0 }, score3: { value: 0, level: 0 } },
  { id: 5, name: '2분제자리걷기', score1: { value: 0, level: 0 }, score2: { value: 0, level: 0 }, score3: { value: 0, level: 0 } },
  { id: 6, name: 'TUG', score1: { value: 0, level: 0 }, score2: { value: 0, level: 0 }, score3: { value: 0, level: 0 } },
];

const PdfGenerator = ( { memberDetail, reportArr, selectedReport }: { memberDetail: Member, reportArr: ReportDate[], selectedReport: Report | null } ) => {  
  const today = new Date().toISOString().split('T')[0]; 
  const contentRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const additionalPageRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  const [recordDataArr, setRecordDataArr] = useState(dummyData)
  const [comment, setComment] = useState(selectedReport?.comment || '');
  const [isFix, setIsFix] = useState(true);

  useEffect(()=>{
    if(selectedReport){

      setRecordDataArr(transformData(selectedReport.first_record, reportArr, selectedReport))
      setComment(selectedReport.comment || '');

    }
  },[selectedReport])
  

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
  const id = searchParams?.get('member_id') || '';  
  
  useEffect(() => {
    let searchParamsId = ""
    if (id) {
      searchParamsId = id
      // Fetch 요청 URL
    } 
    fetch(`/api/member?member_id=${searchParamsId}`)
      .then((response) => response.json())
      .then((data) => setMemberDetails(data[0]))
      .catch((error) => console.error('Failed to fetch member details:', error));
  }, [id]); 

  if (!memberDetails) return <SkeletonReport />;
    
  
  const TableComponent = () => {

    
    
    return (
      <div className="overflow-x-auto text-black">
        <table className="min-w-full bg-white border border-gray-300 text-sm"> {/* 테이블 폰트 크기 줄임 */}
          <thead>
            <tr>
              <th className="pb-2 px-2 border-b bg-amber-200 text-left w-28">항목</th>
              <th className="pb-2  px-2 border-b bg-amber-200 text-left w-28">1차 측정</th>
              <th className="pb-2  px-2 border-b bg-amber-200 text-left w-28">직전회차측정</th>
              <th className="pb-2  px-2 border-b bg-amber-200 text-left w-28">최근회차측정</th>
            </tr>
          </thead>
          <tbody>
            {recordDataArr.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-amber-50'} // 홀짝 줄 배경색
              >
                <td className=" pb-3 px-2 border-b font-bold">{item.name}</td>
                {/* 1차 측정 */}
                <td className="pb-3 px-2 border-b font-bold">
                  <div className='flex'>
                    <div className='w-16'>
                      {item.score1.value}
                      {getUnit(item.name)}
                    </div>
                    <span className="font-bold text-teal-500">{"Lv_" + item.score1.level}</span>
                  </div>
                </td>
                {/* 직전회차측정 */}
                <td className="pb-3 px-2 border-b font-bold">
                 <div className='flex'>
                   <div className='w-16'>
                      {item.score2.value}
                      {getUnit(item.name)} 
                   </div>
                    <span className="font-bold text-teal-500">{"Lv_" + item.score2.level}</span>
                 </div>
                </td>
                <td className="pb-3 px-2 border-b font-bold">
                 <div className='flex'>
                    <div className='w-16'>
                      {item.score3.value} 
                      {getUnit(item.name)}
                    </div> 
                    <span className="font-bold text-teal-500">{"Lv_" + item.score3.level}</span>
                 </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    );
  };

const handlereportSubmit = async () => {
  setIsFix(false)

    if (confirm('수정사항을 저장 하시겠습니까?')) {
      try {
        const res = await fetch('/api/report', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: selectedReport?.id, comment })
        });

        if (!res.ok) {
          const error = await res.json();
          alert(`Error: ${error.message}`);
          return;
        }

        alert('보고서가 저장되었습니다.');
      
      } catch (error) {
        console.error('Failed to delete member:', error);
        alert('보고서 저장 중 오류가 발생했습니다.');
      }
    }
}



  const handleDownloadPdf = async () => {
    setIsFix(false)
    try {
      // 1. 변경된 코멘트를 먼저 저장
      await fetch('/api/report', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedReport?.id, comment })
      });

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
          // if (imgHeight > pageHeight) {
          //   pdf.addPage();
          // }
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

      const date = selectedReport?.record_date ? `_${selectedReport?.record_date}` : ""

      // Comments 영역 캡처하여 PDF에 추가
      // if (commentsRef.current) {
      //   const canvas = await html2canvas(commentsRef.current, { scale: 2, useCORS: true, backgroundColor: null });
      //   const imgWidth = 180;
      //   const imgHeight = (canvas.height * imgWidth) / canvas.width;
      //   pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 15, 100, imgWidth, imgHeight);
      // }

      // Save the PDF
      pdf.save(`${memberDetails.name}님 보고서${date}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

const MAX_LINES = 7; // 최대 허용 줄 수
const MAX_CHARS_PER_LINE = 53; // 한 줄에 허용되는 최대 문자 수 (적절한 값으로 조정)

const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const value = e.target.value;
  const lines = value.split("\n");

  // 줄 개수 제한
  if (lines.length > MAX_LINES) return;

  // 너무 긴 줄 강제 개행 처리
  const formattedLines = lines.flatMap(line => {
    if (line.length > MAX_CHARS_PER_LINE) {
      return line.match(new RegExp(`.{1,${MAX_CHARS_PER_LINE}}`, "g")) || [line];
    }
    return line;
  });

  if (formattedLines.length <= MAX_LINES) {
    setComment(formattedLines.join("\n"));
  }
};


  return (
    <div className='flex flex-col bg-gray-100'>
      {/* <Header>
        {undefined}
      </Header> */}

      <div className="flex flex-col p-10 bg-gray-100 min-h-screen">
          {/* Cover Page */}
        <div ref={coverRef} 
             className="bg-white p-14 shadow-lg mx-auto"
            //  style={{
            //   width: '210mm', // A4 너비
            //   height: '297mm', // A4 높이
            //   maxWidth: '100%', // 화면 크기 초과 시 반응형 처리
            //   overflow: 'hidden', // 콘텐츠가 넘칠 경우 숨김 처리 (필요에 따라 변경 가능)
            // }}
             >

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
            <div className="bg-amber-100 rounded-lg flex flex-col items-center justify-center">
              <div className="mb-3 flex flex-col items-center justify-center">
                <p className="text-2xl font-bold">보고서 작성일</p>
                {/* <p className="text-3xl font-bold text-amber-700">{today}</p> */}
                <p className="text-3xl font-bold text-amber-700">{selectedReport?.record_date}</p>
              </div>
            </div>

            {/* 센터명, 이름, 생년월일 */}
            <div className="bg-amber-100 p-10 rounded-lg flex flex-col items-center justify-center">
              <div className="mb-3 flex flex-col items-center justify-center">
                <p className="text-2xl font-bold">이름</p>
                <p className="text-3xl font-bold text-amber-700">{memberDetails.name} 님</p>
              </div>
              <div>
                <p className="text-2xl font-bold flex flex-col items-center justify-center">생년월일</p>
                <p className="text-3xl font-bold text-amber-700">{memberDetails.date_of_birth}</p>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-amber-400 my-5"></div>

          {/* 그래프 섹션 */}
          <section className="mb-8 flex flex-row w-[210mm]">
            {/* 최초기록 */}
            <HexagonalChart dummyData={recordDataArr} />
            {/* 최근기록 */}
            <HexagonalChart2 dummyData={recordDataArr}/>

          </section>
  
          {/* 체력장 상태 */}
          <section className="m-2">
             <div className="flex items-center text-lg my-4">
               {/* <p className="font-bold mb-2 text-black">체력장 측정 결과 {memberDetails.name} 어르신의 상태는&nbsp;</p> */}
               <p className="font-bold mb-2 text-black">체력장 측정 결과 {memberDetails.name} 어르신의 상태는&nbsp;<span className="text-red-600 mb-2 font-bold underline">{selectedReport?.status}</span></p>
               {/* <p className="text-red-600 mb-2 font-bold underline">{reportArr[0]?.status}</p> */}
               {/* <p className="font-bold mb-2 text-black">&nbsp;입니다.</p> */}
             </div>
          </section>

          <div ref={commentsRef}  className="bg-yellow-400 p-4 rounded-lg">
            <h2 className="text-white font-bold text-lg mb-2">Comments</h2>
            {isFix ? 
             <textarea
                name="comment"
                placeholder="Comment"
                value={comment}
                onChange={handleCommentChange}
                className="w-full h-48 p-2 border rounded-md text-black"
              >
              </textarea>
              :
              <div
                onClick={() => setIsFix(true)}
                className="w-[820px] h-48 p-2 border rounded-md text-black bg-white"
                style={{
                  whiteSpace: "pre-wrap", // 줄바꿈 유지
                  wordBreak: "break-word", // 긴 단어 줄바꿈
                  overflowWrap: "break-word",
                  minHeight: "100px",
                }}
              >
                {comment}
              </div>}
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
        
        <div ref={contentRef} 
            // style={{
            //   width: '210mm', // A4 너비
            //   height: '297mm', // A4 높이
            //   maxWidth: '100%', // 화면 크기 초과 시 반응형 처리
            //   overflow: 'hidden', // 콘텐츠가 넘칠 경우 숨김 처리 (필요에 따라 변경 가능)
            // }}
          className="bg-white p-14 shadow-lg mx-auto"
          >
       
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
            <BarChartComponent dataItems={recordDataArr} />
          </section>
  
         <h2 className="text-sm font-bold text-black my-4">최초 및 최근 기록 상세 내용</h2>
          <TableComponent />

          {/* 아이콘 및 설명 섹션 */}
          {/* <section className="grid grid-cols-3 gap-4 text-center m-8"> */}
          <section className="grid grid-cols-3 text-center">
            <div>
              <div className="mx-auto flex justify-center items-center">
                <img 
                  src="/img/아령.png" // 퍼블릭 위치에 있는 이미지 경로
                  // className=" rounded-full h-16 w-16" 
                  className=" rounded-full h-44 w-36 mt-2" 
                />
              </div>
              {/* <h3 className="font-bold text-teal-500">상체근력</h3>
              <p className="text-sm text-gray-600">30초동안 아령 들기</p> */}
            </div>
            <div>
              <div className="mx-auto flex justify-center items-center">
                <img 
                  src="/img/등뒤로손잡기.png" 
                  className="h-44 w-32" 
                />
              </div>
              {/* <h3 className="font-bold text-teal-500">상체유연성</h3>
              <p className="text-sm text-gray-600">등 뒤로 손 맞닿기</p> */}
            </div>
            <div>
              <div className="mx-auto flex justify-center items-center">
                <img 
                  src="/img/앉았다 일어나기.png" 
                  className="h-44 w-40" 
                />
              </div>
              {/* <h3 className="font-bold text-teal-500">하체근력</h3>
              <p className="text-sm text-gray-600">30초동안 앉았다 일어서기</p> */}
            </div>
            <div>
              <div className="mx-auto flex justify-center items-center">
                <img 
                  src="/img/앉아서손뻗기.png" 
                  className="h-44 w-36 mt-1"  
                />
              </div>
              {/* <h3 className="font-bold text-teal-500">하체유연성</h3>
              <p className="text-sm text-gray-600">발 뻗고 발에 손 닿기</p> */}
            </div>
            <div>
              <div className="mx-auto flex justify-center items-center">
                <img 
                  src="/img/제자리걷기.png" 
                  className="h-44 w-42 mt-1" 
                />
              </div>
              {/* <h3 className="font-bold text-teal-500">2분제자리</h3>
              <p className="text-sm text-gray-600">2분동안 제자리 걷기 횟수</p> */}
            </div>
            <div>
              <div className="mx-auto flex justify-center items-center flex-row">
                <img 
                  src="/img/앉아있는 사람.png" 
                  className="h-44 w-36" 
                />
              </div>
             
              {/* <h3 className="font-bold text-teal-500">TUG</h3>
              <p className="text-sm text-gray-600">3m 반환점 돌아와 앉기</p> */}
            </div>
          </section>
        </div>

  {/* 세 번째 페이지 */}
      <div className="flex flex-col p-10 bg-gray-100 min-h-screen">
        <div 
          ref={additionalPageRef} 
          className="bg-white p-14 shadow-lg mx-auto"
          // style={{
          //   width: '210mm', // A4 너비
          //   height: '297mm', // A4 높이
          //   maxWidth: '100%', // 화면 크기 초과 시 반응형 처리
          //   overflow: 'hidden', // 콘텐츠가 넘칠 경우 숨김 처리 (필요에 따라 변경 가능)
          // }}
          >
       
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
            <IndividualLineCharts reportArr={reportArr} selectedReport={selectedReport}/>
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
            {/* PDF 다운로드 */}
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

const transformData = (first_record: FirstRecord | null, reportArr: Report[], selected: Report | null): DataItem[] => {
  if (!first_record) return dummyData;
  if (!reportArr || reportArr.length === 0) return dummyData;

  const selectedReport = reportArr.reduce((max: any, item: any) => (item.id > max.id ? item : max), reportArr[0]);

  // 가장 최근 기록과 직전 기록 설정
  const recentRecord = (selected?.record_5th?.[0] as Record<string, any>) || {};
  const previousRecord = (selected?.record_5th?.[1] as Record<string, any>) || {};

  // 안전하게 값 파싱하는 함수
  const parseScore = (field?: { level?: string; value?: string }): Score => {
    if (!field) return { level: 0, value: 0 };
    try {
      const level = field.level ? JSON.parse(field.level).level || 0 : 0;
      const value = field.value ? JSON.parse(field.value).value || 0 : 0;
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
        score1: parseScore(first_record?.upper_body_strength),
        score2: parseScore(previousRecord?.upper_body_strength),
        score3: parseScore(recentRecord?.upper_body_strength),
      },
      {
        id: 2,
        name: '상체유연성',
        score1: parseScore(first_record?.upper_body_flexibility),
        score2: parseScore(previousRecord?.upper_body_flexibility),
        score3: parseScore(recentRecord?.upper_body_flexibility),
      },
      {
        id: 3,
        name: '하체근력',
        score1: parseScore(first_record?.lower_body_strength),
        score2: parseScore(previousRecord?.lower_body_strength),
        score3: parseScore(recentRecord?.lower_body_strength),
      },
      {
        id: 4,
        name: '하체유연성',
        score1: parseScore(first_record?.lower_body_flexibility),
        score2: parseScore(previousRecord?.lower_body_flexibility),
        score3: parseScore(recentRecord?.lower_body_flexibility),
      },
      {
        id: 5,
        name: '2분제자리걷기',
        score1: parseScore(first_record?.walking_distance),
        score2: parseScore(previousRecord?.walking_distance),
        score3: parseScore(recentRecord?.walking_distance),
      },
      {
        id: 6,
        name: 'TUG',
        score1: parseScore(first_record?.tug),
        score2: parseScore(previousRecord?.tug),
        score3: parseScore(recentRecord?.tug),
      },
    ];
  } catch (error) {
    console.error('Data transformation error:', error);
    return dummyData;
  }
};
