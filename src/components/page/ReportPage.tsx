'use client';

import { useEffect, useState } from 'react';
import ReportForm from '../organisms/ReportForm';
import PdfGenerator from '../organisms/PdfGenerator';
import DeleteConfirmModal from '../organisms/DeleteConfirmModal';
import SkeletonReport from '../organisms/SkeletonReport';
import { useSearchParams } from 'next/navigation';
import { Member } from '@/types/member';
import { Report } from '@/types/report';
import { useRouter } from 'next/navigation';

export default function ReportPage() {
  const router = useRouter();

  const [memberDetails, setMemberDetails] = useState<Member | null>(null);
  const searchParams = useSearchParams(); // 현재 경로의 쿼리 파라미터를 가져옵니다.
  const member_id = searchParams?.get('member_id') || '';  

  useEffect(() => {
    let searchParamsId = ""
    if (member_id) {
      searchParamsId = member_id
      // Fetch 요청 URL
    } else {
      searchParamsId = "GON_001"
    }
    fetch(`/api/member?member_id=${searchParamsId}`)
      .then((response) => response.json())
      .then((data) => setMemberDetails(data[0]))
      .catch((error) => console.error('Failed to fetch member details:', error));
  }, [member_id]); // Dependency array includes id to refetch when id changes

  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(0);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);

  // 보고서 목록 가져오기
  const fetchReports = async () => {
    const response = await fetch(`/api/report/?member_id=${member_id}`);
    const data = await response.json();

    if(data.length === 0) {
      alert('보고서가 없습니다. 체력기록 페이지로 이동합니다.');
      router.push(`/memberInfo-page?id=${member_id}`);
    } else {
      setReports([...data].sort((a, b) => b.id - a.id));
      // setReports(data)
      
      const maxIdItem = data.reduce((max:any, item:any) => (item.id > max.id ? item : max), data[0]);
      setSelectedReport(maxIdItem)
      // setSelectedReportId(maxIdItem.id)
    }
  };

  // 컴포넌트 마운트 시 데이터 불러오기
  useEffect(() => {
    fetchReports();
  }, []);

  const openDeleteModal = (id: number) => {
    setDeleteRecordId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteRecordId(null);
    setIsDeleteModalOpen(false);
  };

  const changePickReport = (report: Report) => {
    setSelectedReport(report)
  }

  if (!memberDetails) return <SkeletonReport />;
console.log(reports);

  return (

     <div className="p-4 text-black flex flex-row">
        <PdfGenerator 
          memberDetail={memberDetails}
          reportArr={reports}  
          selectedReport={selectedReport}
        />
  
        <div className='flex flex-col mt-14'>
              <h1 className="text-2xl font-bold mb-4">{memberDetails.name}님 보고서 목록({memberDetails.member_id})</h1>

              {/* <button
                  className="bg-blue-500 text-white px-4 py-2 mb-4"
                  onClick={() => {
                    setSelectedReport(null);
                    setIsFormOpen(true);
                  }}
                >
                  신규 보고서 생성
                </button> */}
          
                {isFormOpen && (
                  <ReportForm
                    member_id={member_id}
                    report={selectedReport}
                    onClose={() => {
                      setIsFormOpen(false);
                      fetchReports();
                    }}
                  />
                )}
          
          {reports.length !== 0 ?
            <ul className="w-full border border-gray-200 rounded-lg overflow-hidden sticky top-28">
            {/* 헤더 */}
            <li className="grid grid-cols-4 bg-blue-100 text-sm font-semibold text-center py-2">
              <div className="px-4">작성일</div>
              <div className="px-4">센터</div>
              <div className="px-4">보고서 id</div>
              <div className="px-4"></div>
            </li>
  
            {/* 보고서 목록 */}
            {reports
            // .sort((a, b) => new Date(b.record_date).getTime() - new Date(a.record_date).getTime())
            .sort((a, b) => b.id - a.id)
            .map((report, index) => (
              <li
                key={report.id}
                className={`cursor-pointer hover:bg-gradient-to-r from-blue-100 to-blue-200 grid grid-cols-4 items-center text-center text-sm py-2 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } border-b last:border-b-0`}
                onClick={() => {
                  setSelectedReport(report);
                  changePickReport(report);
                  // setIsFormOpen(true);
                  setSelectedReportId(report.id)
                }}
              >
                <div className="px-4">{report.record_date}</div>
  
                {/* 센터 */}
                <div className="px-4">{getInstitutionName(report.center)}</div>


                {/* 보고서id */}
                <div className="px-4">{report.id}</div>
  
                {/* 버튼 그룹 */}
                <div className="px-4 flex justify-center gap-2">
                  {/* <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    onClick={() => {
                      setSelectedReport(report);
                      setIsFormOpen(true);
                    }}
                  >
                    수정
                  </button> */}
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => openDeleteModal(report.id)}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
          :
          <p>보고서 기록이 없습니다.</p>
          }
  
        </div>
  
        <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={() => {
          if (deleteRecordId) {
            fetch('/api/report', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: deleteRecordId }),
            })
              .then(() => {
                fetchReports();
                closeDeleteModal();
              })
              .catch((error) => {
                console.error('Failed to delete record:', error);
                closeDeleteModal();
              });
          }
        }}
      />
      </div>
  );
}

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
