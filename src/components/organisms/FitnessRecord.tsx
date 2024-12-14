'use client';

import React, { useEffect, useState } from 'react';
import { FitnessRecord } from '@/types/fitnessRecord';
import { useSearchParams } from 'next/navigation';
import Modal from '../organisms/Modal';
import DeleteConfirmModal from '../organisms/DeleteConfirmModal';
import ConfirmButton  from '../organisms/ConfirmButton';

const FitnessRecordComponent = () => {
  // 라우터 쿼리에서 id 가져오기
  const searchParams = useSearchParams();
  const memberId = searchParams?.get('id');
    
  const [records, setRecords] = useState<FitnessRecord[]>([]);

  const check_th = records.reduce((max, record) => 
    (record.check_th > max.check_th ? record : max), records[0])?.check_th + 1
  
  const [newRecord, setNewRecord] = useState<Partial<FitnessRecord>>({
    member_id: memberId || '', // null일 경우 빈 문자열로 설정
    measurement_date: '',
    check_th: 1,
    lower_body_flexibility: { level: 0, value: 0 },
    lower_body_strength: { level: 0, value: 0 },
    upper_body_flexibility: { level: 0, value: 0 },
    upper_body_strength: { level: 0, value: 0 },
    tug: { level: 0, value: 0 },
    walking_distance: { level: 0, value: 0 },
    status: '',
    comment: '',
  });
  
  const [editingRecord, setEditingRecord] = useState<Partial<FitnessRecord> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch records
  const fetchRecords = async () => {
    setLoading(true);
    try {
      const url = memberId ? `/api/fitnessrecord?member_id=${memberId}` : '/api/fitnessrecord';
      const res = await fetch(url);
      const data = await res.json();
      setRecords(data);
    } catch (error) {
      console.error('Failed to fetch records:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecords();
  }, [memberId]);

  const addRecord = async () => {
    // 필수 입력 값 검증
    if (
      !newRecord.measurement_date ||
      newRecord.lower_body_flexibility?.value === 0 ||
      newRecord.lower_body_strength?.value === 0 ||
      newRecord.upper_body_flexibility?.value === 0 ||
      newRecord.upper_body_strength?.value === 0 ||
      newRecord.tug?.value === 0 ||
      newRecord.walking_distance?.value === 0
    ) {
      alert('날짜 및 모든 측정값을 입력해주세요. (Comment는 비워도 저장됩니다)');
      return;
    }
    
    try {
      // 각 항목의 레벨 계산
      const lowerBodyFlexibilityLevel = getLevel("하체유연성", newRecord.lower_body_flexibility?.value ?? 0);
      const lowerBodyStrengthLevel = getLevel("하체근력", newRecord.lower_body_strength?.value ?? 0);
      const upperBodyFlexibilityLevel = getLevel("상체유연성", newRecord.upper_body_flexibility?.value ?? 0);
      const upperBodyStrengthLevel = getLevel("상체근력", newRecord.upper_body_strength?.value ?? 0);
      const tugLevel = getLevel("TUG", newRecord.tug?.value ?? 0);
      const walkingDistanceLevel = getLevel("2분제자리걷기", newRecord.walking_distance?.value ?? 0);
  
      // 평균 레벨 계산
      const levels = [
        lowerBodyFlexibilityLevel,
        lowerBodyStrengthLevel,
        upperBodyFlexibilityLevel,
        upperBodyStrengthLevel,
        tugLevel,
        walkingDistanceLevel,
      ];
      const avgLevel = Math.round(levels.reduce((sum, level) => sum + level, 0) / levels.length);
  
      // avgLevel에 따른 status 설정
      let status = '';
      if (avgLevel >= 4.5) {
        status = '양호';
      } else if (avgLevel >= 3.5) {
        status = '낙상 주의';
      } else if (avgLevel >= 2.5) {
        status = '낙상 경계';
      } else {
        status = '낙상 위험';
      }
  
      // 새로운 레코드 생성
      await fetch('/api/fitnessrecord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newRecord,
          check_th: isNaN(check_th) ? 1:check_th,
          lower_body_flexibility: { ...newRecord.lower_body_flexibility, level: lowerBodyFlexibilityLevel },
          lower_body_strength: { ...newRecord.lower_body_strength, level: lowerBodyStrengthLevel },
          upper_body_flexibility: { ...newRecord.upper_body_flexibility, level: upperBodyFlexibilityLevel },
          upper_body_strength: { ...newRecord.upper_body_strength, level: upperBodyStrengthLevel },
          tug: { ...newRecord.tug, level: tugLevel },
          walking_distance: { ...newRecord.walking_distance, level: walkingDistanceLevel },
          avg_level: avgLevel,
          status: status,
        }),
      });
  
      fetchRecords();
  
      setNewRecord({
        member_id: '',
        measurement_date: '',
        // check_th: records.length + 1,
        check_th: check_th,
        lower_body_flexibility: { level: 0, value: 0 },
        lower_body_strength: { level: 0, value: 0 },
        upper_body_flexibility: { level: 0, value: 0 },
        upper_body_strength: { level: 0, value: 0 },
        tug: { level: 0, value: 0 },
        walking_distance: { level: 0, value: 0 },
        status: '',
        comment: '',
      });

      // 화면 리프레시
    // window.location.reload();
    } catch (error) {
      console.error('Failed to add record:', error);
    }
    
  };

  const openDeleteModal = (id: number) => {
    setDeleteRecordId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteRecordId(null);
    setIsDeleteModalOpen(false);
  };

  const closeModal = () => {
    setEditingRecord(null);
    setIsModalOpen(false);
  };

    const updateRecord = async () => {
      if (!editingRecord || !editingRecord.id) return;
    
      try {
        // 각 항목의 레벨 계산
        const lowerBodyFlexibilityLevel = getLevel("하체유연성", editingRecord.lower_body_flexibility?.value ?? 0);
        const lowerBodyStrengthLevel = getLevel("하체근력", editingRecord.lower_body_strength?.value ?? 0);
        const upperBodyFlexibilityLevel = getLevel("상체유연성", editingRecord.upper_body_flexibility?.value ?? 0);
        const upperBodyStrengthLevel = getLevel("상체근력", editingRecord.upper_body_strength?.value ?? 0);
        const tugLevel = getLevel("TUG", editingRecord.tug?.value ?? 0);
        const walkingDistanceLevel = getLevel("2분제자리걷기", editingRecord.walking_distance?.value ?? 0);
    
        // 평균 레벨 계산
        const levels = [
          lowerBodyFlexibilityLevel,
          lowerBodyStrengthLevel,
          upperBodyFlexibilityLevel,
          upperBodyStrengthLevel,
          tugLevel,
          walkingDistanceLevel,
        ];
        const avgLevel = Math.round(levels.reduce((sum, level) => sum + level, 0) / levels.length);
    
        // avgLevel에 따른 status 설정
        let status = '';
        if (avgLevel >= 4.5) {
          status = '양호';
        } else if (avgLevel >= 3.5) {
          status = '낙상 주의';
        } else if (avgLevel >= 2.5) {
          status = '낙상 경계';
        } else {
          status = '낙상 위험';
        }
    
        // 업데이트된 레코드 생성
        const updatedRecord = {
          ...editingRecord,
          lower_body_flexibility: { ...editingRecord.lower_body_flexibility, level: lowerBodyFlexibilityLevel },
          lower_body_strength: { ...editingRecord.lower_body_strength, level: lowerBodyStrengthLevel },
          upper_body_flexibility: { ...editingRecord.upper_body_flexibility, level: upperBodyFlexibilityLevel },
          upper_body_strength: { ...editingRecord.upper_body_strength, level: upperBodyStrengthLevel },
          tug: { ...editingRecord.tug, level: tugLevel },
          walking_distance: { ...editingRecord.walking_distance, level: walkingDistanceLevel },
          avg_level: avgLevel,
          status: status,
        };
    
        // API 호출로 업데이트
        await fetch('/api/fitnessrecord', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedRecord),
        });
    
        fetchRecords();
        closeModal();
      } catch (error) {
        console.error('Failed to update record:', error);
      }
    };
    

    const [isRecording, setIsRecording] = useState(false)

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">

    {isRecording ?
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
     <div className='flex justify-between'>
       <h2 className="text-2xl font-semibold mb-4 mt-2">체력측정기록</h2>
        <button
          className="font-bold mt-2 mb-4 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-500 transition"
          onClick={() => setIsRecording(false)}
        >
          접기
        </button>
     </div>

        <div className="grid grid-cols-3 gap-4 mb-2">
          <div className="p-2 border rounded-md">
            {/* {records.length + 1}회차 */}
            {isNaN(check_th) ? 1:check_th}회차
          </div>
          <div className="p-2 border rounded-md">
            {memberId}
          </div>
          <input
            type="date"
            placeholder="Measurement Date"
            className="p-2 border rounded-md"
            value={newRecord.measurement_date}
            onChange={(e) => setNewRecord({ ...newRecord, measurement_date: e.target.value })}
          />
        </div>

    <div className="grid grid-cols-6 gap-4">
       <div>
        <p className='font-bold'>하체 유연성</p>
          <input
            type="number"
            placeholder="입력하세요."
            className="p-2 border rounded-md w-32"
            value={newRecord.lower_body_flexibility?.value}
            onChange={(e) =>
              setNewRecord({
                ...newRecord,
                lower_body_flexibility: { ...newRecord.lower_body_flexibility, 
                  level: getLevel("하체유연성", newRecord.lower_body_flexibility?.value ?? 0), 
                  value: Number(e.target.value)
                 },
              })
            }
          />
       </div>
      
       <div>
       <p className='font-bold'>하체 근력</p>
          <input
            type="number"
            placeholder="입력하세요."
            className="p-2 border rounded-md w-32"
            value={newRecord.lower_body_strength?.value}
            onChange={(e) =>
              setNewRecord({
                ...newRecord,
                lower_body_strength: { ...newRecord.lower_body_strength, 
                  level: getLevel("하체근력", newRecord.lower_body_strength?.value ?? 0), 
                  value: Number(e.target.value)
                 },
              })
            }
          />
       </div>
       <div>
       <p className='font-bold'>상체 유연성</p>
          <input
            type="number"
            placeholder="입력하세요."
            className="p-2 border rounded-md w-32"
            value={newRecord.upper_body_flexibility?.value}
            onChange={(e) =>
              setNewRecord({
                ...newRecord,
                upper_body_flexibility: { ...newRecord.upper_body_flexibility, 
                  level: getLevel("상체유연성", newRecord.upper_body_flexibility?.value ?? 0), 
                  value: Number(e.target.value)
                },
              })
            }
          />
       </div>
       <div>
       <p className='font-bold'>상체 근력</p>
          <input
            type="number"
            placeholder="입력하세요."
            className="p-2 border rounded-md w-32"
            value={newRecord.upper_body_strength?.value}
            onChange={(e) =>
              setNewRecord({
                ...newRecord,
                upper_body_strength: { ...newRecord.upper_body_strength, 
                  level: getLevel("상체근력", newRecord.upper_body_strength?.value ?? 0), 
                  value: Number(e.target.value)
                 },
              })
            }
          />
       </div>

        <div>
        <p className='font-bold'>TUG</p>
          <input
            type="number"
            placeholder="입력하세요."
            className="p-2 border rounded-md w-32"
            value={newRecord.tug?.value}
            onChange={(e) =>
              setNewRecord({
                ...newRecord,
                tug: { ...newRecord.tug, 
                  level: getLevel("TUG", newRecord.tug?.value ?? 0), 
                  value: Number(e.target.value)
                },
              })
            }
          />
        </div>
       <div>
       <p className='font-bold'>2분 제자리 걷기</p>
          <input
            type="number"
            placeholder="입력하세요."
            className="p-2 border rounded-md w-32"
            value={newRecord.walking_distance?.value}
            onChange={(e) =>
              setNewRecord({
                ...newRecord,
                walking_distance: { ...newRecord.walking_distance, 
                  level: getLevel("TUG", newRecord.walking_distance?.value ?? 0), 
                  value: Number(e.target.value)
                 },
              })
            }
          />
       </div>

      </div>
       <div>
        <p className='font-bold'>Comment</p>
          <textarea
            placeholder="코멘트를 입력하세요. (추후 입력 가능)"
            className="p-2 border rounded-md w-full resize-y"
            value={newRecord.comment ?? ''}
            rows={5} // 기본 줄 수 설정
            onChange={(e) => setNewRecord({ ...newRecord, comment: e.target.value })}
          />
       </div>
      <ConfirmButton onConfirm={addRecord} buttonLabel="저장" />
    </div>
    :
    <button
      className="font-bold mb-5 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full"
      onClick={() => setIsRecording(true)}
    >
      체력장 기록하기
    </button>
    }


      {loading && <p className="text-center text-gray-500">Loading...</p>}
  {records.length !== 0 ?  
   <table className="min-w-full table-auto border-collapse border border-gray-200 bg-white rounded-lg shadow-md">
      <thead className="bg-blue-100 sticky top-20">
        <tr>
          <th className="border border-gray-300 px-4 py-2">날짜</th>
          <th className="border border-gray-300 px-4 py-2">회차</th>
          <th className="border border-gray-300 px-4 py-2">하체 유연성</th>
          <th className="border border-gray-300 px-4 py-2">하체 근력</th>
          <th className="border border-gray-300 px-4 py-2">상체 유연성</th>
          <th className="border border-gray-300 px-4 py-2">상체 근력</th>
          <th className="border border-gray-300 px-4 py-2">TUG</th>
          <th className="border border-gray-300 px-4 py-2">2분 제자리걷기</th>
          <th className="border border-gray-300 px-4 py-2">상태</th>
          <th className="border border-gray-300 px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {records
        .sort((a, b) => b.check_th - a.check_th)
        .map((record) => (
          <React.Fragment key={record.id}>
            <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 px-2 py-2 w-fit">{record.measurement_date}</td>
              <td className="border border-gray-300 px-4 py-2 w-16">{record.check_th}</td>
              <td className="border border-gray-300 px-4 py-2">
                {record.lower_body_flexibility.value}{' '}
                <span className={`rounded-full bg-${getStatusColor(record.lower_body_flexibility.level)}-${getStatusColorNum(record.lower_body_flexibility.level)} px-2 py-1 text-xs font-bold mr-3 text-white`}>
                  Lv.{record.lower_body_flexibility.level}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {record.lower_body_strength.value}{' '}
                <span className={`rounded-full bg-${getStatusColor(record.lower_body_strength.level)}-${getStatusColorNum(record.lower_body_strength.level)} px-2 py-1 text-xs font-bold mr-3 text-white`}>
                  Lv.{record.lower_body_strength.level}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {record.upper_body_flexibility.value}{' '}
                <span className={`rounded-full bg-${getStatusColor(record.upper_body_flexibility.level)}-${getStatusColorNum(record.upper_body_flexibility.level)} px-2 py-1 text-xs font-bold mr-3 text-white`}>
                  Lv.{record.upper_body_flexibility.level}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {record.upper_body_strength.value}{' '}
                <span className={`rounded-full bg-${getStatusColor(record.upper_body_strength.level)}-${getStatusColorNum(record.upper_body_strength.level)} px-2 py-1 text-xs font-bold mr-3 text-white`}>
                  Lv.{record.upper_body_strength.level}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {record.tug.value}{' '}
                <span className={`rounded-full bg-${getStatusColor(record.tug.level)}-${getStatusColorNum(record.tug.level)} px-2 py-1 text-xs font-bold mr-3 text-white`}>
                  Lv.{record.tug.level}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {record.walking_distance.value}{' '}
                <span className={`rounded-full bg-${getStatusColor(record.walking_distance.level)}-${getStatusColorNum(record.walking_distance.level)} px-2 py-1 text-xs font-bold mr-3 text-white`}>
                  Lv.{record.walking_distance.level}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {record.status}
                <span className={`bg-${getStatusColor(record.avg_level)}-${getStatusColorNum(record.avg_level)} ml-2 px-2 py-1 text-lg font-bold mr-3 text-white rounded-full`}>
                  Lv.{record.avg_level}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-1 flex flex-row">
                <button
                  className="bg-cyan-500 hover:bg-red-400 text-white font-bold py-1 px-2 rounded-full mr-1"
                  onClick={() => openDeleteModal(record.id)}
                >
                  삭제
                </button>
                <button
                  className="bg-cyan-500 hover:bg-red-400 text-white font-bold py-1 px-2 rounded-full"
                  onClick={() => {
                    setEditingRecord(record);
                    setIsModalOpen(true);
                  }}
                >
                  수정
                </button>
              </td>
            </tr>
            <tr>
              <td colSpan={10} className="border border-gray-300 px-4 py-2 bg-gray-50">
                <strong>Comment:</strong>
                <textarea
                  rows={4} 
                  className="w-full mt-2 p-2 border rounded-md resize-y whitespace-pre-wrap break-words"
                  readOnly
                  value={record.comment || '없음'}
                />
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
    :
    <div className="flex items-center justify-center h-full">
      체력 기록이 없습니다.
    </div>

    }

    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <h2 className="text-2xl font-semibold mb-4">
        {editingRecord?.check_th || ''}회차 기록 수정
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="font-semibold">Member ID</p>
          <p>{editingRecord?.member_id || ''}</p>
        </div>

        <div>
          <p className="font-semibold">Date</p>
          <p>{editingRecord?.measurement_date || ''}</p>
        </div>

        {/* 상태 */}
        <div>
          <p className="font-semibold">상태</p>
          <p>{editingRecord?.status || ''}</p>
        </div>

        {/* 하체 유연성 */}
        <div>
          <p className="font-semibold">하체 유연성</p>
          <input
            type="number"
            placeholder="Lower Body Flexibility Value"
            value={editingRecord?.lower_body_flexibility?.value || ''}
            className="p-2 border rounded-md"
            onChange={(e) =>
              setEditingRecord({
                ...editingRecord,
                lower_body_flexibility: {
                  ...editingRecord?.lower_body_flexibility,
                  level: getLevel("하체유연성", newRecord.lower_body_flexibility?.value ?? 0), 
                  value: Number(e.target.value)
                },
              })
            }
          />
        </div>

        {/* 상체 유연성 */}
        <div>
          <p className="font-semibold">상체 유연성</p>
          <input
            type="number"
            placeholder="Upper Body Flexibility Value"
            value={editingRecord?.upper_body_flexibility?.value || ''}
            className="p-2 border rounded-md"
            onChange={(e) =>
              setEditingRecord({
                ...editingRecord,
                upper_body_flexibility: {
                  ...editingRecord?.upper_body_flexibility,
                  level: getLevel("상체유연성", newRecord.upper_body_flexibility?.value ?? 0), 
                  value: Number(e.target.value)                 ,
                },
              })
            }
          />
        </div>
        {/* tug */}
        <div>
          <p className="font-semibold">TUG</p>
          <input
            type="number"
            placeholder="TUG Value"
            value={editingRecord?.tug?.value || ''}
            className="p-2 border rounded-md"
            onChange={(e) =>
              setEditingRecord({
                ...editingRecord,
                tug: {
                  ...editingRecord?.tug, 
                  level: getLevel("TUG", newRecord.tug?.value ?? 0), 
                  value: Number(e.target.value)                        ,
                },
              })
            }
          />
        </div>

        {/* 하체 근력 */}
        <div>
          <p className="font-semibold">하체 근력</p>
          <input
            type="number"
            placeholder="Lower Body Strength Value"
            value={editingRecord?.lower_body_strength?.value || ''}
            className="p-2 border rounded-md"
            onChange={(e) =>
              setEditingRecord({
                ...editingRecord,
                lower_body_strength: {
                  ...editingRecord?.lower_body_strength,
                  level: getLevel("하체근력", newRecord.lower_body_strength?.value ?? 0), 
                  value: Number(e.target.value)     
                },
              })
            }
          />
        </div>

        {/* 상체 근력 */}
        <div>
          <p className="font-semibold">상체 근력</p>
          <input
            type="number"
            placeholder="Upper Body Strength Value"
            value={editingRecord?.upper_body_strength?.value || ''}
            className="p-2 border rounded-md"
            onChange={(e) =>
              setEditingRecord({
                ...editingRecord,
                upper_body_strength: {
                  ...editingRecord?.upper_body_strength, 
                  level: getLevel("상체근력", newRecord.upper_body_strength?.value ?? 0), 
                  value: Number(e.target.value)                           ,
                },
              })
            }
          />
        </div>

        {/* 2분 제자리 걷기 */}
        <div>
          <p className="font-semibold">2분 제자리 걷기</p>
          <input
            type="number"
            placeholder="walking_distance"
            value={editingRecord?.walking_distance?.value || ''}
            className="p-2 border rounded-md"
            onChange={(e) =>
              setEditingRecord({
                ...editingRecord,
                walking_distance: {
                  ...editingRecord?.walking_distance, 
                  level: getLevel("2분제자리걷기", newRecord.walking_distance?.value ?? 0), 
                  value: Number(e.target.value)                       ,
                },
              })
            }
          />
        </div>

      </div>
        <div>
          <p className="font-semibold">Comment</p>
          <textarea
            placeholder="코멘트를 입력하세요. (추후 입력 가능)"
            className="p-2 border rounded-md w-full resize-y"
            rows={5} // 기본 줄 수 설정
            value={editingRecord?.comment ?? ''} // null 또는 undefined일 경우 빈 문자열로 설정
            onChange={(e) => setEditingRecord({ ...editingRecord, comment: e.target.value })}
          />
        </div>

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mr-2"
        onClick={updateRecord}
      >
        저장
      </button>
    </Modal>



      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={() => {
          if (deleteRecordId) {
            fetch('/api/fitnessrecord', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: deleteRecordId }),
            })
              .then(() => {
                fetchRecords();
                closeDeleteModal();
              })
              .catch((error) => {
                console.error('Failed to delete record:', error);
                closeDeleteModal();
              });
          }
        }}
      />
    </div>

  );
};

export default FitnessRecordComponent;

function getLevel(id: string, value: number): number {
  switch (id) {
    case "상체근력":
      if (value >= 11) return 5;
      if (value >= 8) return 4;
      if (value >= 5) return 3;
      if (value >= 3) return 2;
      return 1;

    case "상체유연성":
      if (value >= 0) return 5;
      if (value >= -2.5) return 4;
      if (value >= -5) return 3;
      if (value >= -8) return 2;
      return 1;

    case "하체근력":
      if (value >= 9) return 5;
      if (value >= 6) return 4;
      if (value >= 4) return 3;
      if (value >= 2) return 2;
      return 1;

    case "하체유연성":
      if (value >= 0.5) return 5;
      if (value >= -2) return 4;
      if (value >= -4) return 3;
      if (value >= -6) return 2;
      return 1;

    case "TUG":
      if (value <= 15) return 5;
      if (value <= 20) return 4;
      if (value <= 25) return 3;
      if (value <= 35) return 2;
      return 1;

    case "2분제자리걷기":
      if (value >= 78) return 5;
      if (value >= 65) return 4;
      if (value >= 52) return 3;
      if (value >= 35) return 2;
      return 1;

    default:
      throw new Error("Invalid id");
  }
}

function getStatusColor(value: number) {
  if (value >= 4.5) return 'blue';   // value가 4.5 이상일 경우 'green' 반환
  if (value >= 3.5) return 'green';  // value가 3.5 이상일 경우 'yellow' 반환
  if (value >= 2.5) return 'yellow';   // value가 2.5 이상일 경우 'amber' 반환
  if (value >= 1.5) return 'red'; 
  return 'red';  
}

function getStatusColorNum(value: number) {
  if (value >= 4.5) return '500'; 
  if (value >= 3.5) return '500'; 
  if (value >= 2.5) return '500';   
  if (value >= 1.5) return '500';   
  return '700';  
}