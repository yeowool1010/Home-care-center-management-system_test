import React, { useState , useEffect } from 'react';
import Link from 'next/link';
import MessageModal from '../organisms/MessageModal'

type ProfileHeaderProps = {
  member: any; 
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ member }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const fetchReports = async () => {
    const response = await fetch(`/api/fitnessrecord/?member_id=${member.member_id}`);
    const data = await response.json();
    setReports(data);
  };

    // 컴포넌트 마운트 시 데이터 불러오기
    useEffect(() => {
      fetchReports();
    }, []);

    console.log(reports.length);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    

  return (
<div className='flex flex-col'>
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {/* <img src="/img/profile.svg" alt="Profile" className="w-16 h-16 rounded-full" /> */}
          <div>
            <p className="font-semibold text-lg">{member.name} ({member.member_id})</p>
            <p className="text-sm text-gray-600">{member.date_of_birth} {member.gender}</p>
          </div>
        </div>
  
        <div className="flex flex-col space-y-1 text-right">
          <p className="font-semibold text-sm">장기요양등급: {member.care_grade || null}급</p>
          <p className="text-sm text-gray-600">보조기: {member.assistive_device || "없음"}</p>
          <p className="text-sm">주소: {member.address || "없음"}</p>
          <p className="text-sm">전화번호: {member.phone_number}</p>
        </div>

        <div className="flex flex-col space-y-1 text-right">
          <p className="font-semibold text-sm">보호자: {member.guardian_name || "없음"}</p>
          <p className="text-sm text-gray-600">관계: {member.guardian_relationship || "없음"}</p>
          <p className="text-sm">보호자전화: {member.guardian_contact || "없음"}</p>
          <p className="text-sm">보호자주소: {member.guardian_address || "없음"}</p>
        </div>
       {reports.length !== 0 ? 
        <Link
            href={{
              pathname: `/report`,
              query: {
                member_id: `${member.member_id}`
              }
            }}
          >
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 max-w-[20vw]"
            >
            {member.name}님 보고서 작성
          </button>
       </Link>
       :
       <button 
          className="bg-gray-400 text-white px-4 py-2 rounded-lg max-w-[20vw]"
          onClick={openModal}
          >
          {member.name}님 보고서 작성
        </button>
       }
      </div>

      <MessageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        message="체력기록이 없을 경우 보고서를 작성 할 수 없습니다다."
      />
</div>
  );
};

export default ProfileHeader;
