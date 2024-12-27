"use client";
import Header from '../../components/Header'
import Calendar from '../../components/organisms/Calendar'
import { useSearchParams } from 'next/navigation';

const ReportCalendarPage = () => {
  const searchParams = useSearchParams();
  const center = searchParams?.get('center') || 'HAE';

  return (
    <div className="mt-12 min-h-screen bg-gray-100 flex items-center justify-center">
      <Header>
        {undefined}
      </Header>
      <div className='flex flex-col mt-14 w-full'>
        <p className='bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md text-4xl text-center'>{getInstitutionName(center)} 보고서</p>
        <div className='my-10'>
          <Calendar/>
        </div>
      </div>
      </div>
  );
};

export default ReportCalendarPage;


function getInstitutionName(code: string): string {
  switch (code) {
    case 'GON':
      return '경덕재 곤지암점';
    case 'YAN':
      return '경덕재 양벌점';
    case 'YEO':
      return '경덕재 여주점';
    case 'OPO':
      return '경덕재 오포점';
    case 'TCH':
      return '경덕재 퇴촌점';
    case 'ROA':
      return '너싱홈 로아점';
    case 'HAE':
      return '너싱홈 해원';
    case 'ROAD':
      return '로아주간보호';
    default:
      return '알 수 없는 기관';
  }
}
