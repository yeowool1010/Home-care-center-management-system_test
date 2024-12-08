// src/pages/member.tsx
'use client';

import { useState, useEffect } from 'react';
import { Member } from '@/types/member';

export default function MemberPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [center, setCenter] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // 멤버 목록 가져오기
  const fetchMembers = async () => {
    const res = await fetch('/api/member');
    const data = await res.json();
    setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // 멤버 추가
  const handleAddMember = async () => {
    await fetch('/api/member', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone_number: phoneNumber, center }),
    });
    setName('');
    setPhoneNumber('');
    setCenter('');
    fetchMembers();
  };

  // 멤버 수정
  const handleUpdateMember = async () => {
    if (editingId === null) return;

    await fetch('/api/member', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingId, newName: name, newPhoneNumber: phoneNumber, newCenter: center }),
    });
    setName('');
    setPhoneNumber('');
    setCenter('');
    setEditingId(null);
    fetchMembers();
  };

  // 멤버 삭제
  const handleDeleteMember = async (id: number) => {
    await fetch('/api/member', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deleteId: id }),
    });
    fetchMembers();
  };

  // 수정 버튼 클릭 시
  const handleEditClick = (member: Member) => {
    setName(member.name);
    setPhoneNumber(member.phone_number);
    setCenter(member.center);
    setEditingId(member.id);
  };

  return (
    <div>
      <h1>Members</h1>

      <div className='text-black'>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Center"
          value={center}
          onChange={(e) => setCenter(e.target.value)}
        />
        <button onClick={editingId ? handleUpdateMember : handleAddMember}>
          {editingId ? 'Update Member' : 'Add Member'}
        </button>
      </div>

      <ul className='text-black'>
        {members.map((member) => (
          <li key={member.id}>
            {member.name} - {member.phone_number} - {member.center}
            <button onClick={() => handleEditClick(member)}>Edit</button>
            <button onClick={() => handleDeleteMember(member.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
