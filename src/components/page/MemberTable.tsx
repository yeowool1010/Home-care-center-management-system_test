import React, { useState, useEffect } from 'react';
import CreateModal from '../organisms/CreateModal';
import Alert from '../organisms/Alert';
import Link from 'next/link';

const MemberTable = () => {
  const [activeTab, setActiveTab] = useState<string>('회원 목록');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const membersPerPage = 10; // Number of members to show per page
  const pageGroupSize = 5; // Number of page buttons to show in pagination

  // Fetch people data from API on component mount
  useEffect(() => {
    fetch('/api/people')
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error('Error fetching members:', error));
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(members.length / membersPerPage);

  // Get current page members
  const currentMembers = members.slice(
    (currentPage - 1) * membersPerPage,
    currentPage * membersPerPage
  );

  // Calculate the start and end of the current page group
  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

      </div>

      {/* Table */}
      {/* <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
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
          {currentMembers.map((member, index) => (
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
      </table> */}

      {/* Table Body */}
      <div className="divide-y">
      <div className="grid grid-cols-8 bg-blue-100 text-sm text-center font-semibold">
        <div className="px-4 py-2 whitespace-nowrap">회원번호</div>
        <div className="px-4 py-2 whitespace-nowrap">이름</div>
        <div className="px-4 py-2 whitespace-nowrap">생년월일</div>
        <div className="px-4 py-2 whitespace-nowrap">성별</div>
        <div className="px-4 py-2 whitespace-nowrap">장기요양등급</div>
        <div className="px-4 py-2 whitespace-nowrap">보조기</div>
        <div className="px-4 py-2 whitespace-nowrap">주소</div>
        <div className="px-4 py-2 whitespace-nowrap">전화번호</div>
      </div>
        {currentMembers.map((member, index) => (
          <Link key={member.memberId} href={`/memberInfo-page?id=${member.userId}`} passHref>
            <div
              className={`grid grid-cols-8 px-4 py-2 text-center text-sm ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } border-t transition-all duration-200 ease-in-out transform hover:shadow-lg hover:bg-gradient-to-r from-blue-100 to-blue-200 cursor-pointer`}
            >
              <div>{member.userId}</div>
              <div>{member.name}</div>
              <div>{member.birthDate}</div>
              <div>{member.gender}</div>
              <div>{member.careLevel}</div>
              <div>{member.assistiveDevice}</div>
              <div>{member.address}</div>
              <div>{member.phoneNumber}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          처음
        </button>
        <button
          onClick={() => handlePageChange(startPage - 1)}
          disabled={startPage === 1}
          className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          ◀
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(startPage + i)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === startPage + i ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            {startPage + i}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(endPage + 1)}
          disabled={endPage === totalPages}
          className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          ▶
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          마지막
        </button>
      </div>
    </div>
  );
};

export default MemberTable;
