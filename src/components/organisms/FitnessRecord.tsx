'use client';

import React, { useEffect, useState } from 'react';
import { FitnessRecord } from '@/types/fitnessRecord';
import { useSearchParams } from 'next/navigation';
import Modal from '../organisms/Modal';
import DeleteConfirmModal from '../organisms/DeleteConfirmModal';

const FitnessRecordComponent = () => {
  const [records, setRecords] = useState<FitnessRecord[]>([]);
  const [newRecord, setNewRecord] = useState<Partial<FitnessRecord>>({
    member_id: '',
    measurement_date: '',
    check_th: 0,
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

  // 라우터 쿼리에서 id 가져오기
  const searchParams = useSearchParams();
  const memberId = searchParams?.get('id');

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
    try {
      await fetch('/api/fitnessrecord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord),
      });
      fetchRecords();
      setNewRecord({
        member_id: '',
        measurement_date: '',
        check_th: 0,
        lower_body_flexibility: { level: 0, value: 0 },
        lower_body_strength: { level: 0, value: 0 },
        upper_body_flexibility: { level: 0, value: 0 },
        upper_body_strength: { level: 0, value: 0 },
        tug: { level: 0, value: 0 },
        walking_distance: { level: 0, value: 0 },
        status: '',
        comment: '',
      });
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

    // Update record
    const updateRecord = async () => {
      if (!editingRecord || !editingRecord.id) return;
    
      try {
        await fetch('/api/fitnessrecord', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingRecord),
        });
        fetchRecords();
        closeModal();
      } catch (error) {
        console.error('Failed to update record:', error);
      }
    };
    
  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Fitness Records</h1>

      <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Record</h2>
      <div className="grid grid-cols-8 gap-4">
        <input
          type="text"
          placeholder="Member ID"
          className="p-2 border rounded-md"
          onChange={(e) => setNewRecord({ ...newRecord, member_id: e.target.value })}
        />
        <input
          type="date"
          placeholder="Measurement Date"
          className="p-2 border rounded-md"
          onChange={(e) => setNewRecord({ ...newRecord, measurement_date: e.target.value })}
        />
        <input
          type="number"
          placeholder="Check #"
          className="p-2 border rounded-md"
          onChange={(e) => setNewRecord({ ...newRecord, check_th: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Lower Body Flexibility Level"
          className="p-2 border rounded-md"
          onChange={(e) =>
            setNewRecord({
              ...newRecord,
              lower_body_flexibility: { ...newRecord.lower_body_flexibility, 
                level: Number(e.target.value), 
                value: newRecord.lower_body_flexibility?.value ?? 0
              },
            })
          }
        />

        <input
          type="number"
          placeholder="Lower Body Flexibility Value"
          className="p-2 border rounded-md"
          onChange={(e) =>
            setNewRecord({
              ...newRecord,
              lower_body_flexibility: { ...newRecord.lower_body_flexibility, 
                level: Number(e.target.value), 
                value: newRecord.lower_body_flexibility?.value ?? 0
               },
            })
          }
        />
        <input
          type="number"
          placeholder="Lower Body Strength Level"
          className="p-2 border rounded-md"
          onChange={(e) =>
            setNewRecord({
              ...newRecord,
              lower_body_strength: { ...newRecord.lower_body_strength, 
                level: Number(e.target.value), 
                value: newRecord.lower_body_strength?.value ?? 0
               },
            })
          }
        />
        <input
          type="number"
          placeholder="Lower Body Strength Value"
          className="p-2 border rounded-md"
          onChange={(e) =>
            setNewRecord({
              ...newRecord,
              lower_body_strength: { ...newRecord.lower_body_strength, 
                level: Number(e.target.value), 
                value: newRecord.lower_body_strength?.value ?? 0
               },
            })
          }
        />
        <input
          type="number"
          placeholder="Upper Body Flexibility Level"
          className="p-2 border rounded-md"
          onChange={(e) =>
            setNewRecord({
              ...newRecord,
              upper_body_flexibility: { ...newRecord.upper_body_flexibility, 
                level: Number(e.target.value), 
                value: newRecord.upper_body_flexibility?.value ?? 0
               },
            })
          }
        />
        <input
          type="number"
          placeholder="Upper Body Flexibility Value"
          className="p-2 border rounded-md"
          onChange={(e) =>
            setNewRecord({
              ...newRecord,
              upper_body_flexibility: { ...newRecord.upper_body_flexibility, 
                level: Number(e.target.value), 
                value: newRecord.upper_body_flexibility?.value ?? 0

              },
            })
          }
        />
        <input
          type="number"
          placeholder="Upper Body Strength Level"
          className="p-2 border rounded-md"
          onChange={(e) =>
            setNewRecord({
              ...newRecord,
              upper_body_strength: { ...newRecord.upper_body_strength, 
                level: Number(e.target.value), 
                value: newRecord.upper_body_strength?.value ?? 0
               },
            })
          }
        />
        <input
          type="number"
          placeholder="Upper Body Strength Value"
          className="p-2 border rounded-md"
          onChange={(e) =>
            setNewRecord({
              ...newRecord,
              upper_body_strength: { ...newRecord.upper_body_strength, 
                level: Number(e.target.value), 
                value: newRecord.upper_body_strength?.value ?? 0
               },
            })
          }
        />
        <input
          type="number"
          placeholder="TUG Level"
          className="p-2 border rounded-md"
          onChange={(e) =>
            setNewRecord({
              ...newRecord,
              tug: { ...newRecord.tug, 
                level: Number(e.target.value), 
                value: newRecord.tug?.value ?? 0
               },
            })
          }
        />
        <input
          type="number"
          placeholder="TUG Value"
          className="p-2 border rounded-md"
          onChange={(e) =>
            setNewRecord({
              ...newRecord,
              tug: { ...newRecord.tug, 
                level: Number(e.target.value), 
                value: newRecord.tug?.value ?? 0
              },
            })
          }
        />
        <input
          type="number"
          placeholder="Walking Distance Level"
          className="p-2 border rounded-md"
          onChange={(e) =>
            setNewRecord({
              ...newRecord,
              walking_distance: { ...newRecord.walking_distance, 
                level: Number(e.target.value), 
                value: newRecord.walking_distance?.value ?? 0
               },
            })
          }
        />
        <input
          type="number"
          placeholder="Walking Distance Value"
          className="p-2 border rounded-md"
          onChange={(e) =>
            setNewRecord({
              ...newRecord,
              walking_distance: { ...newRecord.walking_distance, 
                level: Number(e.target.value), 
                value: newRecord.walking_distance?.value ?? 0
               },
            })
          }
        />
        <input
          type="text"
          placeholder="Status"
          className="p-2 border rounded-md"
          onChange={(e) => setNewRecord({ ...newRecord, status: e.target.value })}
        />
        <input
          type="text"
          placeholder="Comment"
          className="p-2 border rounded-md"
          onChange={(e) => setNewRecord({ ...newRecord, comment: e.target.value })}
        />
      </div>
      
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={addRecord}
      >
        저장
      </button>
    </div>


      {loading && <p className="text-center text-gray-500">Loading...</p>}

      <table className="min-w-full table-auto border-collapse border border-gray-200 bg-white rounded-lg shadow-md">
        <thead className="bg-blue-100">
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
            <th className="border border-gray-300 px-4 py-2">내용</th>
            <th className="border border-gray-300 px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
        {records.map((record) => (
          <tr key={record.id} className="hover:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">{record.measurement_date}</td>
            <td className="border border-gray-300 px-4 py-2">{record.check_th}</td>
            <td className="border border-gray-300 px-4 py-2">
              {record.lower_body_flexibility.value} <span className='rounded-full bg-blue-500 uppercase px-2 py-1 text-xs font-bold mr-3 text-white'>Lv.{record.lower_body_flexibility.level}</span>
            </td>
            <td className="border border-gray-300 px-4 py-2">
             {record.lower_body_strength.value} <span className='rounded-full bg-blue-500 uppercase px-2 py-1 text-xs font-bold mr-3 text-white'>Lv.{record.lower_body_strength.level}</span>
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {record.upper_body_flexibility.value} <span className='rounded-full bg-blue-500 uppercase px-2 py-1 text-xs font-bold mr-3 text-white'>Lv.{record.upper_body_flexibility.level}</span>
            </td>
            <td className="border border-gray-300 px-4 py-2">
             {record.upper_body_strength.value} <span className='rounded-full bg-blue-500 uppercase px-2 py-1 text-xs font-bold mr-3 text-white'>Lv.{record.upper_body_strength.level}</span>
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {record.tug.value} <span className='rounded-full bg-blue-500 uppercase px-2 py-1 text-xs font-bold mr-3 text-white'>Lv.{record.tug.level}</span>
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {record.walking_distance.value} <span className='rounded-full bg-blue-500 uppercase px-2 py-1 text-xs font-bold mr-3 text-white'>Lv.{record.walking_distance.level}</span>
            </td>
            <td className="border border-gray-300 px-4 py-2">{record.status}</td>
            <td className="border border-gray-300 px-4 py-2">{record.comment || '없음'}</td>
            <td className="border border-gray-300 px-4 py-2">
              <button
                className="text-red-500 mr-2 hover:underline"
                onClick={() => openDeleteModal(record.id)}
              >
                삭제
              </button>
              <button
                className="text-blue-500 hover:underline"
                onClick={() => {
                  setEditingRecord(record);
                  setIsModalOpen(true);
                }}
              >
                수정
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
      <h2 className="text-2xl font-semibold mb-4">
        {editingRecord?.name || ''}님 {editingRecord?.check_th || ''}회차 기록 수정
      </h2>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="font-semibold">Member ID</p>
          <p>{editingRecord?.member_id || ''}</p>
        </div>

        <div>
          <p className="font-semibold">Date</p>
          <p>{editingRecord?.measurement_date || ''}</p>
        </div>

        {/* 하체 유연성 */}
        <div>
          <p className="font-semibold">하체 유연성 Level</p>
          <input
            type="number"
            placeholder="Lower Body Flexibility Level"
            value={newRecord.lower_body_flexibility?.level || ''}
            className="p-2 border rounded-md"
            onChange={(e) =>
              setNewRecord({
                ...newRecord,
                lower_body_flexibility: {
                  level: Number(e.target.value),
                  value: newRecord.lower_body_flexibility?.value ?? 0, // 기본값 설정
                },
              })
            }
          />

        </div>
        <div>
          <p className="font-semibold">하체 유연성 Value</p>
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
                  level: Number(e.target.value),
                  value: newRecord.lower_body_flexibility?.value ?? 0, // 기본값 설정
                },
              })
            }
          />
        </div>

        {/* 하체 근력 */}
        <div>
          <p className="font-semibold">하체 근력 Level</p>
          <input
            type="number"
            placeholder="Lower Body Strength Level"
            value={editingRecord?.lower_body_strength?.level || ''}
            className="p-2 border rounded-md"
            onChange={(e) =>
              setEditingRecord({
                ...editingRecord,
                lower_body_strength: {
                  ...editingRecord?.lower_body_strength,
                  level: Number(e.target.value),
                  value: newRecord.lower_body_strength?.value ?? 0, // 기본값 설정

                },
              })
            }
          />
        </div>
        <div>
          <p className="font-semibold">하체 근력 Value</p>
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
                  level: Number(e.target.value),
                  value: newRecord.lower_body_strength?.value ?? 0, // 기본값 설정
                },
              })
            }
          />
        </div>

        {/* 상체 유연성 */}
        <div>
          <p className="font-semibold">상체 유연성 Level</p>
          <input
            type="number"
            placeholder="Upper Body Flexibility Level"
            value={editingRecord?.upper_body_flexibility?.level || ''}
            className="p-2 border rounded-md"
            onChange={(e) =>
              setEditingRecord({
                ...editingRecord,
                upper_body_flexibility: {
                  ...editingRecord?.upper_body_flexibility,
                  level: Number(e.target.value),
                  value: newRecord.upper_body_flexibility?.value ?? 0, // 기본값 설정

                },
              })
            }
          />
        </div>
        <div>
          <p className="font-semibold">상체 유연성 Value</p>
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
                  level: Number(e.target.value),
                  value: newRecord.upper_body_flexibility?.value ?? 0, // 기본값 설정                  ,
                },
              })
            }
          />
        </div>

        {/* 상체 근력 */}
        <div>
          <p className="font-semibold">상체 근력 Level</p>
          <input
            type="number"
            placeholder="Upper Body Strength Level"
            value={editingRecord?.upper_body_strength?.level || ''}
            className="p-2 border rounded-md"
            onChange={(e) =>
              setEditingRecord({
                ...editingRecord,
                upper_body_strength: {
                  ...editingRecord?.upper_body_strength,
                  level: Number(e.target.value),
                  value: newRecord.upper_body_strength?.value ?? 0, // 기본값 설정                  ,

                },
              })
            }
          />
        </div>
        <div>
          <p className="font-semibold">상체 근력 Value</p>
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
                  level: Number(e.target.value),
                  value: newRecord.upper_body_strength?.value ?? 0, // 기본값 설정                       ,
                },
              })
            }
          />
        </div>

        {/* 상태 및 내용 */}
        <div>
          <p className="font-semibold">상태</p>
          <input
            type="text"
            placeholder="Status"
            value={editingRecord?.status || ''}
            className="p-2 border rounded-md"
            onChange={(e) => setEditingRecord({ ...editingRecord, status: e.target.value })}
          />
        </div>
        <div>
          <p className="font-semibold">내용</p>
          <input
            type="text"
            placeholder="Comment"
            value={editingRecord?.comment || ''}
            className="p-2 border rounded-md"
            onChange={(e) => setEditingRecord({ ...editingRecord, comment: e.target.value })}
          />
        </div>
      </div>

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
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