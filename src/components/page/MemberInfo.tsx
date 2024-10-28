'use client'
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ProfileHeader from '../organisms/ProfileHeader';
import MeasurementCategories from '../organisms/MeasurementCategories';
import RecordItem from '../organisms/RecordItem';
import Pagination from '../organisms/Pagination';

interface MemberDetails {
  userId: string;
  name: string;
  birthDate: string;
  gender: string;
  careLevel: string;
  assistiveDevice: string;
  address: string;
  phoneNumber: string;
}

const MemberInfo: React.FC = () => {
  const [memberDetails, setMemberDetails] = useState<MemberDetails | null>(null);
  
  const pathname = useSearchParams();  // 현재 경로를 가져옵니다.
  const router = useRouter();  // 라우터 객체를 가져옵니다.
  console.log(pathname);
  // console.log(router);


  const id = pathname?.get("id") || '';
  console.log(id);

  useEffect(() => {
    if (id) {  // Ensure there is an id before making the fetch call
      fetch(` /api/member-details?userId=${id}`)
        .then(response => response.json())
        .then(data => setMemberDetails(data))
        // .then(data => console.log(data))
        .catch(error => console.error('Failed to fetch member details:', error));
    }
  }, [id]); // Dependency array includes id to refetch when id changes

  if (!memberDetails) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6 bg-blue-50 text-black">
      <ProfileHeader member={memberDetails} />
      <MeasurementCategories />

      <RecordItem
        round="3회차"
        date="2024 . 09 . 03"
        upperStrength="15회"
        upperFlexibility="+3"
        lowerStrength="15회"
        lowerFlexibility="+0.3"
        tug="15초"
        stationaryWalk="15회"
      />
      <RecordItem
        round="2회차"
        date="2024 . 09 . 03"
        upperStrength="15회"
        upperFlexibility="+3"
        lowerStrength="15회"
        lowerFlexibility="+0.3"
        tug="15초"
        stationaryWalk="15회"
      />
      <RecordItem
        round="1회차"
        date="2024 . 09 . 03"
        upperStrength="15회"
        upperFlexibility="+3"
        lowerStrength="15회"
        lowerFlexibility="+0.3"
        tug="15초"
        stationaryWalk="15회"
      />

      <Pagination />
    </div>
  );
};

export default MemberInfo;
