import ProfileHeader from '../organisms/ProfileHeader';
import MeasurementCategories from '../organisms//MeasurementCategories';
import RecordItem from '../organisms//RecordItem';
import Pagination from '../organisms/Pagination';

const MemberInfo = () => {
  return (
    <div className="container mx-auto p-6 bg-blue-50 text-black">
      <ProfileHeader />
      <MeasurementCategories />
      
      {/* Example records */}
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
