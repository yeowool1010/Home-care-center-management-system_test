'use client';

import { useEffect, useState } from 'react';
import ReportForm from '../organisms/ReportForm';

interface Report {
  id: number;
  member_id: string;
  birth: string;
  record_date: string;
  record_5th: object;
  first_record: object;
  comment: string;
  status: string;
  center: string;
}

export default function ReportPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 보고서 목록 가져오기
  const fetchReports = async () => {
    const response = await fetch('/api/report');
    const data = await response.json();
    setReports(data);
  };

  const getReports = async (id:number) => {
    const response = await fetch(`/api/report/?id=${id}`);
    const data = await response.json();
    console.log(data[0]);
    
  }

  // 보고서 삭제
  const deleteReport = async (id: number) => {
    await fetch('/api/report', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    fetchReports();
  };

  // 컴포넌트 마운트 시 데이터 불러오기
  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">Report Management</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 mb-4"
        onClick={() => {
          setSelectedReport(null);
          setIsFormOpen(true);
        }}
      >
        Create New Report
      </button>

      {isFormOpen && (
        <ReportForm
          report={selectedReport}
          onClose={() => {
            setIsFormOpen(false);
            fetchReports();
          }}
        />
      )}

      <ul>
        {reports.map((report) => (
          <li 
            onClick={()=>getReports(report.id)}
            key={report.id} 
            className="border p-2 mb-2 flex justify-between items-center"
          >
            <div>
              <p>
                <strong>Member ID:</strong> {report.member_id}
              </p>
              <p>
                <strong>Center:</strong> {report.center}
              </p>
            </div>
            <div>
              <button
                className="bg-yellow-500 text-white px-2 py-1 mr-2"
                onClick={() => {
                  setSelectedReport(report);
                  setIsFormOpen(true);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1"
                onClick={() => deleteReport(report.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
