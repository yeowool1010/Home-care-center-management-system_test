// pages/api/fitnessRecord.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface FitnessRecord {
  이름: string;
  기록: Array<{
    측정회차: number;
    상체근력: number;
    하체유연성: number;
    상체유연성: number;
    TUG: number;
    제자리걷기: number;
    특이사항: string;
  }>;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<FitnessRecord>) {
  const fitnessRecord: FitnessRecord = {
    이름: "박여울",
    기록: [
      {
        측정회차: 1,
        상체근력: 10,
        하체유연성: 7,
        상체유연성: 8,
        TUG: 12,
        제자리걷기: 15,
        특이사항: "좋은 진행",
      },
      {
        측정회차: 2,
        상체근력: 12,
        하체유연성: 8,
        상체유연성: 9,
        TUG: 11,
        제자리걷기: 14,
        특이사항: "개선됨",
      },
    ],
  };
  res.status(200).json(fitnessRecord);
}
