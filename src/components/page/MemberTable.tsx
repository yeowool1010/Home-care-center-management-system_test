"use client";

import React, { useState, useEffect } from 'react';
import CreateModal from '../organisms/CreateModal';
import Alert from '../organisms/Alert';
import Link from 'next/link';
import { Member } from '@/types/member';
import { useRouter, useSearchParams } from 'next/navigation';

const MemberTable = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 기본값 설정
  const center = searchParams?.get('center') || 'GON';

  useEffect(() => {
    // 쿼리 파라미터에 'center'가 없으면 URL에 추가
    if (!searchParams?.get('center')) {
      const currentParams = new URLSearchParams(searchParams?.toString() ?? '');
      currentParams.set('center', 'GON');
      router.replace(`?${currentParams.toString()}`);
    }
  }, [searchParams, router]);

  const [activeTab, setActiveTab] = useState<string>('회원 목록');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const membersPerPage = 10; // Number of members to show per page
  const pageGroupSize = 5; // Number of page buttons to show in pagination

  // 멤버 목록 가져오기 (center 기준으로 필터링)
  const fetchMembers = async () => {
    try {
      const res = await fetch(`/api/member?center=${center}`);
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [center]);

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
    <div className="flex flex-col items-center p-10 text-bl text-black">
      {/* Modal Component */}
      <CreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Header Tabs */}
      <div className="flex justify-between w-full mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
        >
          회원추가
        </button>
      </div>

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
          <Link
            key={index}
            href={{
              pathname: `/memberInfo-page`,
              query: {
                id: `${member.member_id}`
              }
            }}
            passHref
          >
            <div
              className={`grid grid-cols-8 px-54 py-2 text-center text-s ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } border-t transition-all duration-200 ease-in-out transform hover:shadow-lg hover:bg-gradient-to-r from-blue-100 to-blue-200 cursor-pointer`}
            >
              <div>{member.member_id}</div>
              <div>{member.name}</div>
              <div>{member.date_of_birth}</div>
              <div>{member.gender}</div>
              <div>{member.care_grade}</div>
              <div>{member.assistive_device}</div>
              <div>{member.address}</div>
              <div>{member.phone_number}</div>
            </div>
          </Link>
        ))}
      </div>

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
