import React, { useState, useEffect } from 'react';
import CreateModal from '../organisms/CreateModal';
import Alert from '../organisms/Alert';
import Link from 'next/link';

const MemberTable = () => {
  const [activeTab, setActiveTab] = useState<string>('회원 목록');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState<any[]>([]);

  // Fetch people data from API on component mount
  useEffect(() => {
    fetch('/api/people')
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error('Error fetching members:', error));
  }, []);

  return (
    <div className="flex flex-col items-center p-4 text-bl text-black">
      {/* Modal Component */}
      <CreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Header Tabs */}
      <div className="flex justify-between w-full max-w-6xl mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
        >
          회원추가
        </button>
        <Link href={`/memberInfo-page?id=${'H-001'}`} passHref>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
            임시 회원 정보 진입
          </button>
        </Link>
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
          {members.map((member, index) => (
            <tr
              key={member.memberId}
              className={`${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } border-t transition-all duration-200 ease-in-out transform hover:shadow-lg hover:bg-gradient-to-r from-blue-100 to-blue-200`}
            >
              <td className="px-4 py-2 text-center">{member.userId}</td>
              <td className="px-4 py-2 text-center">{member.name}</td>
              <td className="px-4 py-2 text-center">{member.birthDate}</td>
              <td className="px-4 py-2 text-center">{member.gender}</td>
              <td className="px-4 py-2 text-center">{member.careLevel}</td>
              <td className="px-4 py-2 text-center">{member.assistiveDevice}</td>
              <td className="px-4 py-2 text-center">{member.address}</td>
              <td className="px-4 py-2 text-center">{member.phoneNumber}</td>
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
