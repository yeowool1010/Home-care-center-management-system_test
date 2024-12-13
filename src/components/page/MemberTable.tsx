"use client";

import React, { useState, useEffect } from 'react';
import CreateModal from '../organisms/CreateModal';
import EditModal from '../organisms/EditModal';
import SkeletonBanner from '../organisms/SkeletonBanner';
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

  useEffect(()=>{
    setCurrentPage(1)
  },[center])

  const [activeTab, setActiveTab] = useState<string>('회원 목록');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const membersPerPage = 10; // Number of members to show per page
  const pageGroupSize = 5; // Number of page buttons to show in pagination

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // 수정 모달 열기
  const openUpdateModal = (member: Member) => {
    setSelectedMember(member);
    setIsUpdateModalOpen(true);
  };
  // 멤버 목록 가져오기 (center 기준으로 필터링)
  const fetchMembers = async () => {
    try {
      const res = await fetch(`/api/member?center=${center}`);
      const data = await res.json();

      const sortedData = data.sort((a: { member_id: string; }, b: { member_id: string; }) => {
        const numA = parseInt(a.member_id.split('_')[1], 10); // 'GON_025' → 25
        const numB = parseInt(b.member_id.split('_')[1], 10); // 'GON_026' → 26
        return numA - numB; // 오름차순 정렬
      });

      setMembers(sortedData);
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

  const refreshMembers = () => {
    // 회원 목록을 새로고침하는 로직을 여기에 작성
    fetchMembers(); // 예시로 fetchMembers 함수 호출
  };

    // 회원 삭제 기능
    const handleDelete = async (member_id: string) => {
      if (confirm('정말로 이 회원을 삭제하시겠습니까?')) {
        try {
          const res = await fetch('/api/member', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ deleteId: member_id }),
          });
  
          if (!res.ok) {
            const error = await res.json();
            alert(`Error: ${error.message}`);
            return;
          }
  
          alert('회원이 삭제되었습니다.');
          refreshMembers();
        } catch (error) {
          console.error('Failed to delete member:', error);
          alert('회원 삭제 중 오류가 발생했습니다.');
        }
      }
    };

  return (
    <div className="flex flex-col items-center p-10 text-bl text-black">
      {/* Modal Component */}
      <CreateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        refreshMembers={refreshMembers} // 이 prop을 추가
        lastMenber={members.length > 0 ? members[members.length - 1].member_id : 'GON_000'} // 기본값 설정
        center={center}
      />

      {selectedMember && (
        <EditModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          member={selectedMember}
          refreshMembers={refreshMembers}
        />
      )}

      {/* Header Tabs */}
      <div className="flex justify-between w-full mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
        >
         {getInstitutionName(center)} 회원추가
        </button>

        {/* <Link
          href={{
            pathname: `/report-calendar`,
            query: {
              center: `${center}`
            }
          }}
          passHref
        >
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
          >
            {getInstitutionName(center)} 보고서
          </button>
        </Link> */}

      </div>

      {/* Table Body */}
      {currentMembers.length !== 0 ?
      <>
        <div className="divide-y">
          <div className="grid grid-cols-9 bg-blue-100 text-sm text-center font-semibold">
            <div className="px-4 py-2 whitespace-nowrap">회원번호</div>
            <div className="px-4 py-2 whitespace-nowrap">이름</div>
            <div className="px-4 py-2 whitespace-nowrap">생년월일</div>
            <div className="px-4 py-2 whitespace-nowrap">성별</div>
            <div className="px-4 py-2 whitespace-nowrap">장기요양등급</div>
            <div className="px-4 py-2 whitespace-nowrap">보조기</div>
            <div className="px-4 py-2 whitespace-nowrap">주소</div>
            <div className="px-4 py-2 whitespace-nowrap">전화번호</div>
            <div className="px-4 py-2 whitespace-nowrap"></div>
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
                  className={`grid grid-cols-9 px-54 py-2 text-center text-s ${
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
              <div className="flex gap-2 justify-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    openUpdateModal(member);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  수정
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(member.id.toString());
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  삭제
                </button>
              </div>
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
      </>
      :
      <SkeletonBanner />
      }
    </div>
  );
};

export default MemberTable;

function getInstitutionName(code: string): string {
  switch (code) {
    case 'GON':
      return '경덕재 곤지암점';
    case 'YAN':
      return '경덕재 양벌점';
    case 'YEO':
      return '경덕재 여주점';
    case 'OPO':
      return '경덕재 오포점';
    case 'TCH':
      return '경덕재 퇴촌점';
    case 'ROA':
      return '너싱홈 로아점';
    case 'HAE':
      return '너싱홈 해원';
    case 'ROAD':
      return '로아주간보호';
    default:
      return '알 수 없는 기관';
  }
}
