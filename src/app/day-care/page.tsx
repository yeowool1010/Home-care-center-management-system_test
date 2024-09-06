"use client";
import { useState, useEffect } from 'react';

const mockData = [
  { id: 1, name: "강복례", gender: "여", birth: "1939-03-06", status: "입소", grade: "4등급", number: "L1906113354-100", endDate: "2025-01-11" },
  { id: 2, name: "박여울", gender: "여", birth: "1939-03-06", status: "입소", grade: "6등급", number: "L1906113354-200", endDate: "2025-01-11" },
  { id: 3, name: "임율", gender: "여", birth: "1939-03-06", status: "퇴소", grade: "1등급", number: "L1906113354-300", endDate: "2025-01-11" },
  { id: 4, name: "홍길동", gender: "여", birth: "1939-03-06", status: "입소", grade: "2등급", number: "L1906113354-400", endDate: "2025-01-11" },
  // Add more mock data as needed
];

export default function Home() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="bg-blue-50 text-gray-700 dark:text-white dark:bg-gray-900 min-h-screen p-8">
      <div className="container mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-300">목욕서비스 제공 기록</h1>
          <button onClick={() => setDarkMode(!darkMode)} className="px-4 py-2 bg-blue-600 dark:bg-blue-400 text-white rounded-md shadow-md">
            {darkMode ? '라이트 모드' : '다크 모드'}
          </button>
        </div>
        <div className="flex items-center mb-6">
          <div className="flex-1">
            <label className="block text-gray-700 dark:text-gray-300">기간</label>
            <div className="flex items-center">
              <input type="date" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700" />
              <span className="mx-2 text-gray-700 dark:text-gray-300">~</span>
              <input type="date" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700" />
            </div>
          </div>
          <div className="flex-1 ml-4">
            <label className="block text-gray-700 dark:text-gray-300">상태</label>
            <select className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700">
              <option>입소</option>
              <option>퇴소</option>
            </select>
          </div>
          <button className="ml-4 px-4 py-2 bg-blue-600 dark:bg-blue-400 text-white rounded-md shadow-md">검색</button>
        </div>
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-blue-100 dark:bg-gray-700">
              <th className="border border-gray-300 dark:border-gray-600 p-2">수급자</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">성별</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">환자생일</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">상태</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">요양등급</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">장기요양인정번호</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">만료일자</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((person) => (
              <tr key={person.id} className="hover:bg-blue-50 dark:hover:bg-gray-600 cursor-pointer" onClick={() => setSelectedPerson(person)}>
                <td className="border border-gray-300 dark:border-gray-600 p-2">{person.name}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">{person.gender}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">{person.birth}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">{person.status}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">{person.grade}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">{person.number}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">{person.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedPerson && (
          <div className="mt-6 p-4 bg-blue-100 dark:bg-gray-700 rounded-lg">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-300 mb-4">{selectedPerson.name} - 상세정보</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300">수급자 상태</label>
                <input type="text" value={selectedPerson.status} readOnly className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700" />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">요양등급</label>
                <input type="text" value={selectedPerson.grade} readOnly className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700" />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">장기요양인정번호</label>
                <input type="text" value={selectedPerson.number} readOnly className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700" />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">만료일자</label>
                <input type="text" value={selectedPerson.endDate} readOnly className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700" />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700 dark:text-gray-300">특이사항</label>
                <textarea className="mt-1 block w-full h-32 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700" />
              </div>
              <div className="col-span-2 flex justify-end">
                <button className="px-4 py-2 bg-blue-600 dark:bg-blue-400 text-white rounded-md shadow-md">저장</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
