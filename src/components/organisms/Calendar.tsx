'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// 예제 문서 데이터 (날짜와 문서 이름)
const documents = [
  { date: 3, name: '곽재순님 1회차' },
  { date: 5, name: '권명택님 2회차' },
  { date: 12, name: '곽재순님 2회차' },
  { date: 18, name: '권명택님 2회차' },
  { date: 24, name: '곽재순님 3회차' },
  { date: 27, name: '곽재순님 4회차' },
];

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  useEffect(() => {
    generateCalendarDays();
  }, [currentDate]);

  // 현재 월의 일수 생성
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const lastDay = new Date(year, month + 1, 0).getDate();
    const daysArray = Array.from({ length: lastDay }, (_, i) => i + 1);

    setDaysInMonth(daysArray);
  };

  // 요일 배열
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  // 현재 월과 연도 가져오기
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  // 월 변경 핸들러
  const handleMonthChange = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  // 년도 선택 핸들러
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(Number(e.target.value));
    setCurrentDate(newDate);
  };

  // 월 선택 핸들러
  const handleMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(Number(e.target.value));
    setCurrentDate(newDate);
  };

  return (
    <div className="flex gap-4 mx-3">
      <div className="w-full mx-auto border rounded-lg shadow-lg p-4 bg-white text-black">
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
            onClick={() => handleMonthChange(-1)}
          >
            ◀
          </button>
          <div className="flex items-center gap-2">
            <select
              value={currentDate.getFullYear()}
              onChange={handleYearChange}
              className="border rounded px-2 py-1"
            >
              {Array.from({ length: 10 }, (_, i) => year - 5 + i).map((y) => (
                <option key={y} value={y}>
                  {y}년
                </option>
              ))}
            </select>
            <select
              value={currentDate.getMonth()}
              onChange={handleMonthSelect}
              className="border rounded px-2 py-1"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
            onClick={() => handleMonthChange(1)}
          >
            ▶
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 bg-blue-500 text-white font-semibold rounded-t-lg">
          {days.map((day,) => (
            <div key={day} className="text-center py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-black">
          {daysInMonth.map((date) => {
            const document = documents.find((doc) => doc.date === date);
            return (
              <div
                key={date}
                className={`border border-gray-200 p-4 text-center rounded-md transition-all ${
                  document ? 'bg-green-200' : 'bg-white'
                } hover:bg-blue-500 hover:text-white`}
              >
                <div className="relative">
                  {date}
                  {/* {document && (
                    <span className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 rounded-full">
                      ●
                    </span>
                  )} */}
                  {document && (
                    <div className="text-xs mt-1 text-gray-700">{document.name}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full max-w-xl mx-auto border rounded-lg shadow-lg p-4 bg-white text-black">
        <h3 className="text-xl font-bold mb-2">보고서 목록</h3>
        <ul className="list-disc pl-4">
          {documents.map((doc, index) => (
            <Link
              key={`doc-${index}`} // key 추가
              href={{
                pathname: `/pdf`,
                query: {
                  id: `GON_001`,
                },
              }}
              passHref
            >
              <li className="mb-1 cursor-pointer">
                <span className="font-semibold">{doc.date}일:</span> {doc.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
