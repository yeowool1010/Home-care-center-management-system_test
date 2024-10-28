// pages/api/member-details.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface MemberDetails {
  memberId: string;
  userId: string;
  name: string;
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

const members: MemberDetails[] = [
  {
    memberId: "102",
    userId: "A-001",
    name: "Person 102",
    birthDate: "1991-06-18",
    gender: "남성",
    careLevel: "2",
    assistiveDevice: "워커",
    address: "Address 102",
    phoneNumber: "010-1234-1101",
    guardianAddress: "Guardian Address 102",
    guardianPhoneNumber: "010-5678-1101",
    organization: "Organization B"
  },
  // 추가 회원 데이터 ...
];

export default function handler(req: NextApiRequest, res: NextApiResponse<MemberDetails | { message: string }>) {
  const { userId } = req.query; // URL 쿼리에서 userId를 추출

  // userId를 사용하여 멤버 찾기
  const member = members.find(member => member.userId === userId);

  // 회원 정보가 있으면 반환, 없으면 오류 메시지 반환
  if (member) {
    res.status(200).json(member);
  } else {
    res.status(404).json({ message: 'Member not found' });
  }
}
