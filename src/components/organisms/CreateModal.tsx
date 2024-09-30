import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  // Select options for 소속기관, 장기요양등급, 보조기
  const organizations = ['기관명 1', '기관명 2', '기관명 3', '기관명 4', '기관명 5'];
  const careLevels = ['1급', '2급', '3급'];
  const assistiveDevices = ['휠체어', '워커', '지팡이'];

  const [selectedOrganization, setSelectedOrganization] = useState(organizations[0]);
  const [selectedCareLevel, setSelectedCareLevel] = useState(careLevels[0]);
  const [selectedDevice, setSelectedDevice] = useState(assistiveDevices[0]);
  const [deviceList, setDeviceList] = useState<string[]>([]); // List of selected devices

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');

  const handleSave = () => {
    alert('저장이 완료되었습니다.');
  };

  const handleAddDevice = () => {
    if (selectedDevice && !deviceList.includes(selectedDevice)) {
      setDeviceList([...deviceList, selectedDevice]);
    }
  };

  const handleRemoveDevice = (device: string) => {
    setDeviceList(deviceList.filter((item) => item !== device));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-blue-50 rounded-lg shadow-lg p-8 w-full max-w-2xl relative">
          {/* Close Button */}
          <button onClick={onClose} className="absolute top-4 right-4 text-red-500 text-2xl">
            &times;
          </button>

          <h2 className="text-2xl font-bold mb-4 text-gray-800">회원수정</h2>

          <div className="flex space-x-6">
            {/* Left: Image Section */}
            <div className="flex flex-col items-center space-y-4">
              <img src="/img/profile.svg" alt="User Icon" className="w-32 h-32 rounded-full shadow-md" />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                사진첨부
              </button>
            </div>

            {/* Right: Input Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[#707CE6] font-semibold mb-1">성 함</label>
                <input
                  className="w-full p-2 border border-blue-300 rounded-md shadow-sm bg-white"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[#707CE6] font-semibold mb-1">소속기관</label>
                <select
                  className="w-full p-2 border border-blue-300 rounded-md shadow-sm bg-white"
                  value={selectedOrganization}
                  onChange={(e) => setSelectedOrganization(e.target.value)}
                >
                  {organizations.map((org) => (
                    <option key={org} value={org}>
                      {org}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[#707CE6] font-semibold mb-1">성 별</label>
                <input
                  className="w-full p-2 border border-blue-300 rounded-md shadow-sm bg-white"
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[#707CE6] font-semibold mb-1">장기요양등급</label>
                <select
                  className="w-full p-2 border border-blue-300 rounded-md shadow-sm bg-white"
                  value={selectedCareLevel}
                  onChange={(e) => setSelectedCareLevel(e.target.value)}
                >
                  {careLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[#707CE6] font-semibold mb-1">생년월일</label>
                <input
                  className="w-full p-2 border border-blue-300 rounded-md shadow-sm bg-white"
                  type="text"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[#707CE6] font-semibold mb-1">보조기</label>
                <div className="flex space-x-2">
                  <select
                    className="w-full p-2 border border-blue-300 rounded-md shadow-sm bg-white"
                    value={selectedDevice}
                    onChange={(e) => setSelectedDevice(e.target.value)}
                  >
                    {assistiveDevices.map((device) => (
                      <option key={device} value={device}>
                        {device}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAddDevice}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                  >
                    +
                  </button>
                </div>
                {/* Display selected devices */}
                <div className="mt-2">
                  {deviceList.map((device, index) => (
                    <div key={index} className="flex items-center space-x-2 mt-2">
                      <span className="text-sm text-gray-700 bg-gray-200 px-2 py-1 rounded-md">
                        {device}
                      </span>
                      <button
                        onClick={() => handleRemoveDevice(device)}
                        className="text-red-500 hover:text-red-700"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[#707CE6] font-semibold mb-1">연락처</label>
                <input
                  className="w-full p-2 border border-blue-300 rounded-md shadow-sm bg-white"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>

              <div className="flex flex-col col-span-2">
                <label className="text-[#707CE6] font-semibold mb-1">주소</label>
                <input
                  className="w-full p-2 border border-blue-300 rounded-md shadow-sm bg-white"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="주소 검색 버튼으로 선택"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={handleSave}
              className="bg-[#436EF9] text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600"
            >
              저장
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
