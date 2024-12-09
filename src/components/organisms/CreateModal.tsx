import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshMembers: () => void;
  lastMenber: string;
  center: string;
}

const CreateModal: React.FC<ModalProps> = ({ isOpen, onClose, refreshMembers, lastMenber, center }) => {
  const organizations = [
    { name: '경덕재 곤지암점', center: 'GON' },
    { name: '경덕재 양벌점', center: 'YAN' },
    { name: '경덕재 여주점', center: 'YEO' },
    { name: '경덕재 오포점', center: 'OPO' },
    { name: '경덕재 퇴촌점', center: 'TCH' },
    { name: '너싱홈 로아점', center: 'ROA' },
    { name: '너싱홈 해원', center: 'HAE' },
    { name: '로아주간보호센터', center: 'ROAD' },
  ];

  const careLevels = ['1', '2', '3','4','5'];
  const assistiveDevices = ['휠체어', '워커', '지팡이'];
  const genders = ['남', '여'];

  const [selectedOrganization, setSelectedOrganization] = useState(organizations[0]);
  const [selectedCareLevel, setSelectedCareLevel] = useState(careLevels[0]);
  const [selectedDevice, setSelectedDevice] = useState(assistiveDevices[0]);
  const [deviceList, setDeviceList] = useState<string[]>([]);

  const [name, setName] = useState('');
  const [gender, setGender] = useState(genders[0]);
  const [birthday, setBirthday] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianRelationship, setGuardianRelationship] = useState('');
  const [guardianContact, setGuardianContact] = useState('');
  const [guardianAddress, setGuardianAddress] = useState('');

  const handleAddDevice = () => {
    if (selectedDevice && !deviceList.includes(selectedDevice)) {
      setDeviceList([...deviceList, selectedDevice]);
    }
  };

  const handleRemoveDevice = (device: string) => {
    setDeviceList(deviceList.filter((item) => item !== device));
  };

  const handleSave = async () => {
    if (!name || !birthday || !contact || !address) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    try {
      const newMember = {
        name,
        member_id: generateNewMemberId(lastMenber),
        // center: selectedOrganization.center,
        center: center,
        date_of_birth: birthday,
        phone_number: contact,
        care_grade: selectedCareLevel,
        assistive_device: deviceList.join(', '),
        admission_date: new Date().toISOString().split('T')[0],
        address,
        gender,
        guardian_name: guardianName,
        guardian_relationship: guardianRelationship,
        guardian_address: guardianAddress,
        guardian_contact: guardianContact,
      };

      const res = await fetch('/api/member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(`Error: ${error.message}`);
        return;
      }

      alert('회원이 성공적으로 추가되었습니다.');
      onClose();
      refreshMembers();

      setName("")
      setGender(genders[0])
      setBirthday('')
      setContact('')
      setAddress('')
      setGuardianName('')
      setGuardianRelationship('')
      setGuardianContact('')
      setGuardianAddress('')
      setSelectedCareLevel(careLevels[0])
      setSelectedDevice('')
      setDeviceList([])


    } catch (error) {
      console.error('Failed to save member:', error);
      alert('회원 저장 중 오류가 발생했습니다.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-blue-50 rounded-lg shadow-lg p-8 w-full max-w-2xl relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-red-500 text-2xl">
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">회원 추가</h2>

        <div className="grid grid-cols-4 gap-4">
          <div>
          <label className="text-[#707CE6] font-semibold mb-1">이름</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)} // setValue 대신 onChange로 setName 호출
          />
         </div>

            <div>
              <label className="text-[#707CE6] font-semibold mb-1">성별</label>
              <select
                className="w-full p-2 border rounded-md"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                {genders.map((gen) => (
                  <option key={gen} value={gen}>
                    {gen}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[#707CE6] font-semibold mb-1">노인장기요양등급</label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedCareLevel}
                onChange={(e) => setSelectedCareLevel(e.target.value)}
              >
                {careLevels.map((careLevel) => (
                  <option key={careLevel} value={careLevel}>
                    {careLevel}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[#707CE6] font-semibold mb-1">생년월일</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[#707CE6] font-semibold mb-1">연락처</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

                        {/* 보조기 선택 및 추가 */}
            <div className="col-span-3">
              <label className="text-[#707CE6] font-semibold mb-1">보조기</label>
              <div className="flex space-x-2">
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedDevice}
                  onChange={(e) => setSelectedDevice(e.target.value)}
                >
                  {assistiveDevices.map((device) => (
                    <option key={device} value={device}>
                      {device}
                    </option>
                  ))}
                </select>
                {deviceList.map((device, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-1 w-full">
                    <span className="text-sm bg-gray-200 px-2 py-1 rounded-md">{device}</span>
                    <button onClick={() => handleRemoveDevice(device)} className="text-red-500">
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddDevice}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                >
                  추가
                </button>
              </div>
              <div className="mt-2">
               
              </div>
            </div>

            <div className="col-span-4 mb-4">
              <label className="text-[#707CE6] font-semibold mb-1 w-full">주소</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>


          </div>

          {/* 보호자 정보 입력 필드 */}
          <div className='grid grid-cols-4 gap-4 w-full'>
              <div>
                <label className="text-[#707CE6] font-semibold mb-1">보호자 이름</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                />
              </div>
  
              <div>
                <label className="text-[#707CE6] font-semibold mb-1">보호자 관계</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={guardianRelationship}
                  onChange={(e) => setGuardianRelationship(e.target.value)}
                />
              </div>
  
              <div>
                <label className="text-[#707CE6] font-semibold mb-1">보호자 연락처</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={guardianContact}
                  onChange={(e) => setGuardianContact(e.target.value)}
                />
              </div>
  
              <div className="col-span-4">
                <label className="text-[#707CE6] font-semibold mb-1">보호자 주소</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={guardianAddress}
                  onChange={(e) => setGuardianAddress(e.target.value)}
                />
              </div>
            </div>

          <div className="mt-6 flex justify-center space-x-4">
            <button onClick={handleSave} className="bg-blue-500 text-white px-6 py-2 rounded-md">
              저장
            </button>
            <button onClick={onClose} className="bg-gray-500 text-white px-6 py-2 rounded-md">
              취소
            </button>
          </div>

        </div>



      </div>
    </>
  );
};

export default CreateModal;

// 회원 ID 생성 함수
const generateNewMemberId = (currentMemberId: string) => {
  const prefix = currentMemberId.slice(0, 4); // 예: 'GON_'
  const numberPart = parseInt(currentMemberId.slice(-3), 10); // 끝 세 자리 숫자
  const newNumber = numberPart + 1; // 숫자 +1
  const newNumberFormatted = newNumber.toString().padStart(3, '0'); // 항상 세 자리로 포맷팅
  return `${prefix}${newNumberFormatted}`; // 새로운 member_id 반환
};


