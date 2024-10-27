// pages/api/people.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface Person {
  memberId: string;
  name: string;
  userId: string;
  birthDate: string;
  gender: string;
  careLevel: string;
  assistiveDevice: string;
  address: string;
  phoneNumber: string;
  guardianAddress: string;
  guardianPhoneNumber: string;
  organization: string;
}

// Possible assistive devices and organizations
const assistiveDevices = ["휠체어", "워커", "지팡이", "없음"];
const organizations = ["A", "B", "C", "D", "E"];

const people: Person[] = Array.from({ length: 100 }, (_, i) => {
  const org = organizations[i % organizations.length]; // Cycle through A, B, C, D, E
  return {
    memberId: String(i + 1).padStart(3, '0'), // Simple sequential number as memberId
    name: `Person ${i + 1}`,
    userId: `${org}-${String(i + 1).padStart(3, '0')}`, // Format as A-001, B-002, etc.
    birthDate: `199${Math.floor(i % 10)}-0${Math.floor((i % 12) + 1)}-${String((i % 28) + 1).padStart(2, '0')}`,
    gender: i % 2 === 0 ? "여성" : "남성", // Alternate between 여성 and 남성
    careLevel: `${Math.floor((i % 5) + 1)}`,
    assistiveDevice: assistiveDevices[i % assistiveDevices.length],
    address: `Address ${i + 1}`,
    phoneNumber: `010-1234-${(1000 + i).toString().slice(-4)}`,
    guardianAddress: `Guardian Address ${i + 1}`,
    guardianPhoneNumber: `010-5678-${(1000 + i).toString().slice(-4)}`,
    organization: `Organization ${org}`, // Organization based on A, B, C, D, E
  };
});

export default function handler(req: NextApiRequest, res: NextApiResponse<Person[]>) {
  res.status(200).json(people);
}
