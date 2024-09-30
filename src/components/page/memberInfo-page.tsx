import { useRouter } from 'next/router';

const MemberInfoPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the memberId from the query params

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Member Info for ID: {id}</h1>
      {/* You can display the member details here */}
    </div>
  );
};

export default MemberInfoPage;
