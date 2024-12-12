'use client';

import { useState, useEffect } from 'react';

interface Report {
  id?: number;
  member_id: string;
  record_date: string;
  record_5th: object;
  first_record: object;
  comment: string;
}

interface ReportFormProps {
  report: Report | null;
  onClose: () => void;
}

export default function ReportForm({ report, onClose }: ReportFormProps) {
  const [formData, setFormData] = useState<Report>({
    member_id: '',
    record_date: '',
    record_5th: {},
    first_record: {},
    comment: '',
  });

  useEffect(() => {
    if (report) {
      setFormData(report);
    }
  }, [report]);

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
    <form onSubmit={handleSubmit} className="border p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{report ? 'Edit Report' : 'Create Report'}</h2>

      <input
        type="text"
        name="member_id"
        placeholder="Member ID"
        value={formData.member_id}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />

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
      ></textarea>

      <div className="flex justify-end">
        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 mr-2">
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {report ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}
