// src/pages/api/member.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabaseClient';
import { Member } from '@/types/member';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    // CREATE: 새 멤버 추가
    case 'POST':
      const { name, member_id, center, date_of_birth, phone_number, care_grade, assistive_device, admission_date, address, gender, guardian_name, guardian_relationship, guardian_address, guardian_contact } = req.body;
      const { data: createData, error: createError } = await supabase
        .from('member')
        .insert([
          {
            name,
            member_id,
            center,
            date_of_birth,
            phone_number,
            care_grade,
            assistive_device,
            admission_date,
            address,
            gender,
            guardian_name,
            guardian_relationship,
            guardian_address,
            guardian_contact,
          },
        ])
        .select();
      if (createError) return res.status(500).json({ error: createError.message });
      return res.status(201).json(createData);

    // READ: 모든 멤버 조회
    case 'GET':
      const { data: readData, error: readError } = await supabase
        .from('member')
        .select('*');
      if (readError) return res.status(500).json({ error: readError.message });
      return res.status(200).json(readData);

    // UPDATE: 멤버 정보 수정
    case 'PUT':
      const { id, newName, newPhoneNumber } = req.body;
      const { data: updateData, error: updateError } = await supabase
        .from('member')
        .update({ name: newName, phone_number: newPhoneNumber })
        .eq('id', id)
        .select();
      if (updateError) return res.status(500).json({ error: updateError.message });
      return res.status(200).json(updateData);

    // DELETE: 멤버 삭제
    case 'DELETE':
      const { deleteId } = req.body;
      const { data: deleteData, error: deleteError } = await supabase
        .from('member')
        .delete()
        .eq('id', deleteId)
        .select();
      if (deleteError) return res.status(500).json({ error: deleteError.message });
      return res.status(200).json(deleteData);

    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
