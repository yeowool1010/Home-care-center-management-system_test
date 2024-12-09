import React from 'react';
import Link from 'next/link';

type ProfileHeaderProps = {
  member: any; 
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ member }) => {

  return (
<div className='flex flex-col'>
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <img src="/img/profile.svg" alt="Profile" className="w-16 h-16 rounded-full" />
          <div>
            <p className="font-semibold text-lg">{member.name} ({member.member_id})</p>
            <p className="text-sm text-gray-600">{member.date_of_birth} {member.gender}</p>
          </div>
        </div>
  
        <div className="flex flex-col space-y-1 text-right">
          <p className="font-semibold text-sm">장기요양등급: {member.care_grade}급</p>
          <p className="text-sm text-gray-600">보조기: {member.assistive_device || "없음"}</p>
          <p className="text-sm">주소: {member.address || "없음"}</p>
          <p className="text-sm">전화번호: {member.phone_number}</p>
        </div>
       <Link
         href={{
          pathname: `/pdf`,
          query: {
            id: `${member.member_id}`
          }
        }}
       >
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 max-w-[20vw]"
            >
            {member.name}님 보고서 작성
          </button>
       </Link>
      </div>

</div>
  );
};

export default ProfileHeader;
