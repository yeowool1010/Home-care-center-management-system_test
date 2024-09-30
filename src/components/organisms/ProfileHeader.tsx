import React from 'react';

const ProfileHeader: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <img src="/img/profile.svg" alt="Profile" className="w-16 h-16 rounded-full" />
        <div>
          <p className="font-semibold text-lg">홍길동 (H-001)</p>
          <p className="text-sm text-gray-600">1994 . 10 . 10 여자</p>
        </div>
      </div>
      <div className="flex flex-col space-y-1 text-right">
        <p className="font-semibold text-sm">장기요양등급: 1급</p>
        <p className="text-sm text-gray-600">보조기: 휠체어</p>
        <p className="text-sm">주소: 인천시 부평구 길동로 345-2 103동 608호</p>
        <p className="text-sm">📞 010 - 1234 - 5678</p>
      </div>
      <button className="text-xl text-blue-600 hover:text-blue-800">
        <i className="fas fa-edit"></i>
      </button>
    </div>
  );
};

export default ProfileHeader;
