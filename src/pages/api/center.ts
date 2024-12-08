// src/pages/api/center.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    // READ: center 테이블의 모든 데이터 조회
    case 'GET': {
      try {
        const { data, error } = await supabase.from('center').select('*');

        if (error) {
          return res.status(500).json({ error: error.message });
        }

        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ error: 'Server Error' });
      }
    }

    // 허용되지 않은 메서드 처리
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
