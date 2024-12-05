import React from 'react';

interface MemberDetails {
  name: string;
  userId: string;
  birthDate: string;
  gender: string;
  careLevel: string;
  assistiveDevice: string;
  address: string;
  phoneNumber: string;
}

interface ProfileHeaderProps {
  member: MemberDetails;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ member }) => {
  return (
<div className='flex flex-col'>
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <img src="/img/profile.svg" alt="Profile" className="w-16 h-16 rounded-full" />
          <div>
            <p className="font-semibold text-lg">{member.name} ({member.userId})</p>
            <p className="text-sm text-gray-600">{member.birthDate} {member.gender}</p>
          </div>
        </div>
  
        <div className="flex flex-col space-y-1 text-right">
          <p className="font-semibold text-sm">장기요양등급: {member.careLevel}</p>
          <p className="text-sm text-gray-600">보조기: {member.assistiveDevice}</p>
          <p className="text-sm">주소: {member.address}</p>
          <p className="text-sm">📞 {member.phoneNumber}</p>
        </div>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 max-w-[20vw]"
          >
          홍길동님 보고서 작성
        </button>
      </div>

</div>
  );
};

export default ProfileHeader;
