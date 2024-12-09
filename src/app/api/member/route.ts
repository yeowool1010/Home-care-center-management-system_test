// src/app/api/member/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

// CREATE: 새 멤버 추가
export async function POST(req: NextRequest) {
  const {
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
  } = await req.json();

  const { data, error } = await supabase
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

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

// READ: center 값 기반으로 멤버 조회 또는 member_id 값이 일치하는 멤버 조회
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const center = searchParams.get('center');
  const member_id = searchParams.get('member_id');

  let query = supabase.from('member').select('*');

  if (member_id) {
    query = query.eq('member_id', member_id);
  } else if (center) {
    query = query.eq('center', center);
  }

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}

// UPDATE: 멤버 정보 수정
export async function PUT(req: NextRequest) {
  const { id, newName, newPhoneNumber } = await req.json();

  const { data, error } = await supabase
    .from('member')
    .update({ name: newName, phone_number: newPhoneNumber })
    .eq('id', id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}

// DELETE: 멤버 삭제
export async function DELETE(req: NextRequest) {
  const { deleteId } = await req.json();

  const { data, error } = await supabase
    .from('member')
    .delete()
    .eq('id', deleteId)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}
