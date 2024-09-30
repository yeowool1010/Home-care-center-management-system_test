import React, { useState } from 'react';
import CreateModal from '../organisms/CreateModal'
import Alert from '../organisms/Alert';

const MemberTable = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState<string>('회원 목록');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Define tab options
  // const tabs = ['측정기록', '보고서'];
  const tabs = ['보고서'];

  return (
    <div className="flex flex-col items-center p-4 text-bl text-black">
       {/* Modal Component */}
       <CreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Header Tabs */}
      <div className="flex justify-between w-full max-w-6xl mb-4">
        <button
          onClick={() => setIsModalOpen(true)} 
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
          회원추가
        </button>
        <div className="space-x-4 flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg shadow-md text-white transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-500 to-blue-300 shadow-lg'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-100">
            <th className="px-4 py-2">회원번호</th>
            <th className="px-4 py-2">이름</th>
            <th className="px-4 py-2">생년월일</th>
            <th className="px-4 py-2">성별</th>
            <th className="px-4 py-2">장기요양등급</th>
            <th className="px-4 py-2">보조기</th>
            <th className="px-4 py-2">주소</th>
            <th className="px-4 py-2">전화번호</th>
          </tr>
        </thead>
        <tbody>
          {Array(10).fill({
            memberNumber: 'H_001',
            name: '홍길동',
            birthdate: '1994.10.10',
            gender: '여자',
            careLevel: '1등급',
            assistiveDevice: '휠체어',
            address: '인천시 부평구',
            phoneNumber: '010-1234-5678',
          }).map((row, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } border-t transition-all duration-200 ease-in-out transform hover:shadow-lg hover:bg-gradient-to-r from-blue-100 to-blue-200`}
            >
              <td className="px-4 py-2 text-center">{row.memberNumber}</td>
              <td className="px-4 py-2 text-center">{row.name}</td>
              <td className="px-4 py-2 text-center">{row.birthdate}</td>
              <td className="px-4 py-2 text-center">{row.gender}</td>
              <td className="px-4 py-2 text-center">{row.careLevel}</td>
              <td className="px-4 py-2 text-center">{row.assistiveDevice}</td>
              <td className="px-4 py-2 text-center">{row.address}</td>
              <td className="px-4 py-2 text-center">{row.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        <button className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-400">
          ◀
        </button>
        {Array.from({ length: 10 }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded-lg ${
              i === 0 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-400">
          ▶
        </button>
      </div>
    </div>
  );
};

export default MemberTable;
