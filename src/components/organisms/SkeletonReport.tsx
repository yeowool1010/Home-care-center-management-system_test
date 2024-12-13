import React from 'react';

const SkeletonReport = () => {
  return (
    <div className="grid grid-cols-3 gap-8 p-6 bg-gray-100 rounded-lg animate-pulse h-screen mt-10">
      {/* 왼쪽 섹션 */}
      <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
        {/* 제목 */}
        <div className="h-6 w-1/3 bg-gray-300 rounded mb-6 mx-auto"></div>

        {/* 상단 정보 박스 */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="h-24 bg-gray-300 rounded"></div>
          <div className="h-24 bg-gray-300 rounded"></div>
        </div>

        {/* 차트 영역 */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="h-56 bg-gray-300 rounded"></div>
          <div className="h-56 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* 오른쪽 섹션 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* 섹션 제목 */}
        <div className="h-6 w-2/3 bg-gray-300 rounded mb-4"></div>

        {/* 테이블 헤더 */}
        <div className="grid grid-cols-4 gap-2 bg-blue-100 p-2 rounded">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>

        {/* 테이블 로우 */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={`grid grid-cols-4 gap-2 p-2 items-center ${
              index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
            } border-b last:border-b-0`}
          >
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="flex gap-2 justify-center">
              <div className="h-6 w-10 bg-gray-300 rounded"></div>
              <div className="h-6 w-10 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonReport;
