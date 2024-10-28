// pages/api/people/index.ts
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

const assistiveDevices = ["휠체어", "워커", "지팡이", "없음"];
const organizations = ["A", "B", "C", "D", "E"];

const people: Person[] = Array.from({ length: 300 }, (_, i) => {
  const org = organizations[i % organizations.length];
  return {
    memberId: String(i + 1).padStart(3, '0'),
    name: `Person ${i + 1}`,
    userId: `${org}-${String(i + 1).padStart(3, '0')}`,
    birthDate: `199${Math.floor(i % 10)}-0${Math.floor((i % 12) + 1)}-${String((i % 28) + 1).padStart(2, '0')}`,
    gender: i % 2 === 0 ? "여성" : "남성",
    careLevel: `${Math.floor((i % 5) + 1)}`,
    assistiveDevice: assistiveDevices[i % assistiveDevices.length],
    address: `Address ${i + 1}`,
    phoneNumber: `010-1234-${(1000 + i).toString().slice(-4)}`,
    guardianAddress: `Guardian Address ${i + 1}`,
    guardianPhoneNumber: `010-5678-${(1000 + i).toString().slice(-4)}`,
    organization: `Organization ${org}`,
  };
});

export default function handler(req: NextApiRequest, res: NextApiResponse<Person[] | Person | { error: string }>) {
  const { userId } = req.query; // 요청에서 userId 쿼리 파라미터를 추출

  if (!userId || userId === '') {
    res.status(200).json(people); // userId가 빈 문자열이거나 제공되지 않은 경우 전체 리스트 반환
  } else if (typeof userId === 'string') {
    const person = people.find(p => p.userId === userId);
    if (person) {
      res.status(200).json(person); // 해당 userId를 가진 사람의 데이터 반환
    } else {
      res.status(404).json({ error: 'User not found' }); // userId가 리스트에 없는 경우
    }
  } else {
    res.status(400).json({ error: 'Invalid request' }); // userId 파라미터가 제공되지 않은 경우
  }
}
