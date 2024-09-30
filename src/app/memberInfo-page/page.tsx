"use client";
import MemberInfo from '../../components/page/MemberInfo'
import Header from '../../components/Header'

const MemberInfoPage = () => {


  return (
    <div className="mt-12 min-h-screen bg-gray-100 flex items-center justify-center">
      <Header children={undefined} />
      <MemberInfo />
      </div>
  );
};

export default MemberInfoPage;
