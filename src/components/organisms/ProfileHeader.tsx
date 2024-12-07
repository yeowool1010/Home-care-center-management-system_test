import React from 'react';
import { Member } from '@/types/member';

type ProfileHeaderProps = {
  memberDetail: any[]; // Replace `any[]` with the correct type if known
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ memberDetail }) => {
  const member = memberDetail[0]
  
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
          <p className="font-semibold text-sm">장기요양등급: {member.care_grade}</p>
          <p className="text-sm text-gray-600">보조기: {member.assistive_device}</p>
          <p className="text-sm">주소: {member.address}</p>
          <p className="text-sm">📞 {member.phone_number}</p>
        </div>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 max-w-[20vw]"
          >
          {member.name}님 보고서 작성
        </button>
      </div>

</div>
  );
};

export default ProfileHeader;
