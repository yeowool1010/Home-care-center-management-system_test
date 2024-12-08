// src/pages/api/fitnessrecord.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    // CREATE: 새로운 기록 추가
    case 'POST': {
      const {
        member_id,
        check_th,
        measurement_date,
        upper_body_strength,
        upper_body_flexibility,
        lower_body_strength,
        lower_body_flexibility,
        tug,
        walking_distance,
        avg_level,
        status,
        comment,
      } = req.body;

      const { data, error } = await supabase.from('fitnessrecord').insert([
        {
          member_id,
          check_th,
          measurement_date,
          upper_body_strength,
          upper_body_flexibility,
          lower_body_strength,
          lower_body_flexibility,
          tug,
          walking_distance,
          avg_level,
          status,
          comment,
        },
      ]);

      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json(data);
    }

    // READ: 모든 기록 조회
    case 'GET': {
      const { member_id } = req.query;

      let query = supabase.from('fitnessrecord').select('*');

      if (member_id) {
        query = query.eq('member_id', member_id);
      }

      const { data, error } = await query;

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }

    // UPDATE: 기록 수정
    case 'PUT': {
      const { id, ...updateFields } = req.body;

      const { data, error } = await supabase
        .from('fitnessrecord')
        .update(updateFields)
        .eq('id', id);

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }

    // DELETE: 기록 삭제
    case 'DELETE': {
      const { id } = req.body;

      const { data, error } = await supabase.from('fitnessrecord').delete().eq('id', id);

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }

    // 허용되지 않은 메서드 처리
    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
