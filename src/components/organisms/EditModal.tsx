import React, { useState, useEffect } from 'react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: any; // 수정할 회원 데이터
  refreshMembers: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, member, refreshMembers }) => {
  const careLevels = ['1', '2', '3', '4', '5'];
  const assistiveDevices = ['휠체어', '워커', '지팡이'];
  const genders = ['남', '여'];

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [selectedCareLevel, setSelectedCareLevel] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [deviceList, setDeviceList] = useState<string[]>([]);
  const [guardianName, setGuardianName] = useState('');
  const [guardianRelationship, setGuardianRelationship] = useState('');
  const [guardianContact, setGuardianContact] = useState('');
  const [guardianAddress, setGuardianAddress] = useState('');

  useEffect(() => {
    if (member) {
      setName(member.name);
      setGender(member.gender);
      setBirthday(member.date_of_birth);
      setContact(member.phone_number);
      setAddress(member.address);
      setSelectedCareLevel(member.care_grade);
      setDeviceList(member.assistive_device ? member.assistive_device.split(', ') : []);
      setGuardianName(member.guardian_name || '');
      setGuardianRelationship(member.guardian_relationship || '');
      setGuardianContact(member.guardian_contact || '');
      setGuardianAddress(member.guardian_address || '');
    }
  }, [member]);

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
      const updatedMember = {
        name,
        gender,
        date_of_birth: birthday,
        phone_number: contact,
        address,
        care_grade: selectedCareLevel,
        assistive_device: deviceList.join(', '),
        guardian_name: guardianName,
        guardian_relationship: guardianRelationship,
        guardian_contact: guardianContact,
        guardian_address: guardianAddress,
      };

      const res = await fetch(`/api/member`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: member.id, ...updatedMember }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(`Error: ${error.message}`);
        return;
      }

      alert('회원 정보가 성공적으로 수정되었습니다.');
      onClose();
      refreshMembers();
    } catch (error) {
      console.error('Failed to update member:', error);
      alert('회원 수정 중 오류가 발생했습니다.');
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
          <h2 className="text-2xl font-bold mb-4 text-gray-800">회원 수정</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#707CE6] font-semibold mb-1">이름</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

            <div className="col-span-2">
              <label className="text-[#707CE6] font-semibold mb-1">주소</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* 보호자 정보 */}
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

            <div className="col-span-2">
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

export default EditModal;
