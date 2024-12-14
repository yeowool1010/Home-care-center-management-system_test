'use client';

import { useState, useEffect } from 'react';

interface Report {
  id?: number;
  member_id: string;
  record_date: string;
  comment: string;
}

interface ReportFormProps {
  report: Report | null;
  onClose: () => void;
  member_id: string;
}

export default function ReportForm({ report, onClose, member_id }: ReportFormProps) {
  const getCurrentDate = (): string => new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState<Report>({
    member_id: member_id,
    // record_date: getCurrentDate(),
    record_date: '',
    comment: '',
  });
  
  useEffect(() => {
    if (report) {
      setFormData(report);
    } else {
      // record_date가 없으면 현재 날짜로 설정
      setFormData((prev) => ({
        ...prev,
        record_date: new Date().toISOString().split('T')[0],
      }));
    }
  }, [report, member_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = report ? 'PUT' : 'POST';
    await fetch('/api/report', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 mb-4 sticky top-28 bg-white">
      <h2 className="text-xl font-bold mb-2">{report ? '보고서 수정' : '보고서 신규 작성'}</h2>

      <div className="border p-2 mb-2 w-full">{member_id}</div>

      <input
        type="date"
        name="record_date"
        value={formData.record_date}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />

      <textarea
        name="comment"
        placeholder="Comment"
        value={formData.comment}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        rows={6} // 기본 줄 수 설정
      ></textarea>

      <div className="flex justify-end">
        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 mr-2">
          접기
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {report ? '수정' : '저장'}
        </button>
      </div>
    </form>
  );
}
