'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Member } from '@/types/member';
import ProfileHeader from '../organisms/ProfileHeader';
import MeasurementCategories from '../organisms/MeasurementCategories';
import RecordItem from '../organisms/RecordItem';
import FitnessRecordComponent from '../organisms/FitnessRecord'
const MemberInfo: React.FC = () => {
  const [memberDetails, setMemberDetails] = useState<Member | null>(null);

  const searchParams = useSearchParams(); // 현재 경로의 쿼리 파라미터를 가져옵니다.

  const id = searchParams?.get('id') || '';
  console.log(id);

  useEffect(() => {
    if (id) {
      // Fetch 요청 URL
      fetch(`/api/member?member_id=${id}`)
        .then((response) => response.json())
        .then((data) => setMemberDetails(data[0]))
        .catch((error) => console.error('Failed to fetch member details:', error));
    }
  }, [id]); // Dependency array includes id to refetch when id changes

  if (!memberDetails) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6 bg-blue-50 text-black mt-16">
    <ProfileHeader member={memberDetails} />
    {/* <MeasurementCategories /> */}
      <FitnessRecordComponent/>

    </div>
  );
};

export default MemberInfo;
