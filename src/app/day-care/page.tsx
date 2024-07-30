"use client";
import { useState } from 'react';

const mockData = [
  { id: 1, name: "강복례", gender: "여", birth: "1939-03-06", status: "입소", grade: "4등급", number: "L1906113354-100", endDate: "2025-01-11" },
  // Add more mock data as needed
];

export default function DayCare() {
  const [selectedPerson, setSelectedPerson] = useState(null);

  return (
    <div className="bg-blue-50 min-h-screen p-8">
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">목욕서비스 제공 기록</h1>
        <div className="flex items-center mb-6">
          <div className="flex-1">
            <label className="block text-gray-700">기간</label>
            <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="flex-1 ml-4">
            <label className="block text-gray-700">상태</label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
              <option>입소</option>
              <option>퇴소</option>
            </select>
          </div>
          <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md">검색</button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 p-2">수급자</th>
              <th className="border border-gray-300 p-2">성별</th>
              <th className="border border-gray-300 p-2">환자생일</th>
              <th className="border border-gray-300 p-2">상태</th>
              <th className="border border-gray-300 p-2">요양등급</th>
              <th className="border border-gray-300 p-2">장기요양인정번호</th>
              <th className="border border-gray-300 p-2">만료일자</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((person) => (
              <tr key={person.id} className="hover:bg-blue-50 cursor-pointer" onClick={() => setSelectedPerson(person)}>
                <td className="border border-gray-300 p-2">{person.name}</td>
                <td className="border border-gray-300 p-2">{person.gender}</td>
                <td className="border border-gray-300 p-2">{person.birth}</td>
                <td className="border border-gray-300 p-2">{person.status}</td>
                <td className="border border-gray-300 p-2">{person.grade}</td>
                <td className="border border-gray-300 p-2">{person.number}</td>
                <td className="border border-gray-300 p-2">{person.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedPerson && (
          <div className="mt-6 p-4 bg-blue-100 rounded-lg">
            <h2 className="text-xl font-bold text-blue-600 mb-4">{selectedPerson.name} - 상세정보</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">수급자 상태</label>
                <input type="text" value={selectedPerson.status} readOnly className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-gray-700">요양등급</label>
                <input type="text" value={selectedPerson.grade} readOnly className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-gray-700">장기요양인정번호</label>
                <input type="text" value={selectedPerson.number} readOnly className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-gray-700">만료일자</label>
                <input type="text" value={selectedPerson.endDate} readOnly className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
              </div>
              {/* Add more details as needed */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
