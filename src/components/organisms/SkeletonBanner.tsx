// components/SkeletonBanner.tsx
import React from 'react';

const SkeletonBanner = () => {
  return (
    <div className="w-full">
      {/* 테이블 헤더 */}
      <div className="grid grid-cols-9 bg-blue-100 text-sm text-center font-semibold">
        <div className="px-4 py-3">회원번호</div>
        <div className="px-4 py-3">이름</div>
        <div className="px-4 py-3">생년월일</div>
        <div className="px-4 py-3">성별</div>
        <div className="px-4 py-3">장기요양등급</div>
        <div className="px-4 py-3">보조기</div>
        <div className="px-4 py-3">주소</div>
        <div className="px-4 py-3">전화번호</div>
        <div className="px-4 py-3">관리</div>
      </div>

      {/* 스켈레톤 로우 */}
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className={`grid grid-cols-9 px-4 py-3 items-center ${
            index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
          } animate-pulse border-t`}
        >
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
          <div className="flex gap-2 justify-center">
            <div className="h-6 w-10 bg-gray-300 rounded"></div>
            <div className="h-6 w-10 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}

      {/* 페이지네이션 스켈레톤 */}
      <div className="mt-4 flex justify-center space-x-2">
        <div className="h-8 w-12 bg-gray-300 rounded"></div>
        <div className="h-8 w-8 bg-gray-300 rounded"></div>
        <div className="h-8 w-8 bg-gray-300 rounded"></div>
        <div className="h-8 w-8 bg-gray-300 rounded"></div>
        <div className="h-8 w-12 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonBanner;
